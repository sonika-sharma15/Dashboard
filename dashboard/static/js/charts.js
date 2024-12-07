// Fetch data from your API endpoint
async function fetchChartData() {
    try {
        const response = await fetch('/dashboard/chart_data/');
        const data = await response.json();

        // Process the data for chart
        const labels = data.map(item => item.topic); // assuming each item has a 'topic'
        
        const intensityData = data.map(item => item.intensity);
        const likelihoodData = data.map(item => item.likelihood);
        const relevanceData = data.map(item => item.relevance);

        createCombinedChart(labels, intensityData, likelihoodData, relevanceData);
    } catch (error) {
        console.error('Error fetching chart data:', error);
    }
}

// Create the combined chart
function createCombinedChart(labels, intensityData, likelihoodData, relevanceData) {
    const ctx = document.getElementById('combinedChart').getContext('2d');

    new Chart(ctx, {
        type: 'line', // or 'line', 'radar', etc.
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Intensity',
                    data: intensityData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                },
                {
                    label: 'Likelihood',
                    data: likelihoodData,
                    backgroundColor: 'rgba(255, 206, 86, 0.6)',
                },
                {
                    label: 'Relevance',
                    data: relevanceData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Values'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Topics'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Call fetchChartData to load data and create the chart
fetchChartData();