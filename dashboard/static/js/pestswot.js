
let pestChartInstance = null;
let swotChartInstance = null;

// Function to create dynamic charts for PEST and SWOT
function createPestSwotChart(pestData, swotData) {
    // Destroy previous charts if they exist
    if (pestChartInstance) {
        pestChartInstance.destroy();
    }
    if (swotChartInstance) {
        swotChartInstance.destroy();
    }

    // Create PEST Chart if there is data
    const pestChartCtx = document.getElementById('pestChart').getContext('2d');
    if (Object.keys(pestData).length > 0) {
        pestChartInstance = new Chart(pestChartCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(pestData),
                datasets: [{
                    label: 'PEST Analysis',
                    data: Object.values(pestData),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: 'PEST Analysis Chart' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Create SWOT Chart if there is data
    const swotChartCtx = document.getElementById('swotChart').getContext('2d');
    if (Object.keys(swotData).length > 0) {
        swotChartInstance = new Chart(swotChartCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(swotData),
                datasets: [{
                    label: 'SWOT Analysis',
                    data: Object.values(swotData),
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: 'SWOT Analysis Chart' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}

// Function to fetch data and create charts
function fetchData(page = 1) {
    fetch(`/dashboard/pest_swot_data/?page=${page}`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data); // Log the data for debugging

            // Ensure swot_counts includes all categories
            const swotCounts = {
                Strength: data.swot_counts.Strength || 0,
                Weakness: data.swot_counts.Weakness || 0,
                Threat: data.swot_counts.Threat || 0,
                Opportunities: data.swot_counts.Opportunities || 0 // Ensure Opportunity is included
            };

            createPestSwotChart(data.pest_counts, swotCounts);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Initial fetch for the first page
//let currentPage = 1;
fetchData();
