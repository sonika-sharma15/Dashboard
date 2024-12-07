// // Function to fetch data for the end year and topic chart
// async function fetchEndYearTopicChartData() {
//     try {
//         const response = await fetch('/dashboard/year_topics_chart/'); // Update with your actual API endpoint
//         const data = await response.json();

//         // Debugging: Log the fetched data
//         console.log('Fetched End Year and Topic Chart Data:', data);

//         // Ensure data has expected structure
//         if (!Array.isArray(data) || data.length === 0) {
//             console.error('No data received or data is not an array');
//             return;
//         }

//         // Prepare data for the chart
//         const endYears = [...new Set(data.map(item => item.end_year))]; // Unique end years
//         const topics = [...new Set(data.map(item => item.topic))]; // Unique topics

//         // Create arrays to hold metrics for each topic
//         const topicData = topics.map(topic => {
//             return endYears.map(endYear => {
//                 const item = data.find(d => d.topic === topic && d.end_year === endYear);
//                 return item ? item.metric : 0; // Return metric value or 0 if not found
//             });
//         });

//         // Create the combined end year and topic chart
//         createEndYearTopicChart(endYears, topicData, topics);
//     } catch (error) {
//         console.error('Error fetching end year topic chart data:', error);
//     }
// }

// // Function to create the combined chart for End Years by Topics
// function createEndYearTopicChart(endYears, topicData, topics) {
//     const canvas = document.getElementById('endYearTopicChart');
//     if (!canvas) {
//         console.error('Canvas element not found');
//         return;
//     }
//     const ctx = canvas.getContext('2d');
//     if (!ctx) {
//         console.error('Failed to get canvas context');
//         return;
//     }

//     const datasets = topics.map((topic, index) => ({
//         label: topic,
//         data: topicData[index],
//         backgroundColor: `rgba(${index * 40 % 255}, 192, 192, 0.6)`, // Ensure RGB values are valid
//     }));

//     new Chart(ctx, {
//         type: 'bar', // Grouped bar chart for comparison
//         data: {
//             labels: endYears,
//             datasets: datasets
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     title: {
//                         display: true,
//                         text: 'Metric Values'
//                     }
//                 },
//                 x: {
//                     title: {
//                         display: true,
//                         text: 'End Years'
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: true,
//                     position: 'top'
//                 }
//             }
//         }
//     });
// }


async function fetchyeartopicData() {
    try {
        const response = await fetch('/dashboard/location_chart_data/');
        const data = await response.json();

        // Debugging: Log the fetched data
        console.log('Fetched year and topic Chart Data:', data);

        // Prepare data for the chart
        const labels = [...new Set(data.map(item => item.end_year))]; // Unique countries
        const yearData = labels.map(end_year => {
            return data.filter(item => item.end_year === end_year)
                       .reduce((sum, item) => sum + item.end_year, 0);
        });
        const topicData = labels.map(topic => {
            return data.filter(item => item.topic === topic)
                       .reduce((sum, item) => sum + item.topic, 0);
        });

        // Create the combined location chart
        createLocationChart(labels, yearData, topicData);
    } catch (error) {
        console.error('Error fetching location chart data:', error);
    }
}

// Function to create the combined chart for Country and Region
function createYearTopicChart(labels, countryData, regionData) {
    const ctx = document.getElementById('yearTopicchart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',  // Bar chart for comparison
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Year Metrics',
                    data: yearData,
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                },
                {
                    label: 'Topics Metrics',
                    data: topicData,
                    backgroundColor: 'rgba(255, 99, 132, 0.8))',
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
                        text: 'Total Metrics'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Countries'
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

// Call fetchLocationChartData to load data and create the location chart
fetchyeartopicData();
