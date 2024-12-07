//
// async function fetchLocationChartData() {
//     try {
//         const response = await fetch('/dashboard/location_chart_data/');
//         const data = await response.json();

//         // Debugging: Log the fetched data
//         console.log('Fetched Location Chart Data:', data);

//         // Prepare data for the chart
//         const labels = data.map(item => item.country);
//         const countryData = data.map(item => item.country_metric);
//         const regionData = data.map(item => item.region_metric);

//         // Create the combined location chart
//         createLocationChart(labels, countryData, regionData);
//     } catch (error) {
//         console.error('Error fetching location chart data:', error);
//     }
// }


// // Function to create the combined chart for Country and Region
// function createLocationChart(labels, countryData, regionData) {
//     const ctx = document.getElementById('locationChart').getContext('2d');

//     new Chart(ctx, {
//         type: 'bar',  // grouped bar chart for comparison
//         data: {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Country',
//                     data: countryData,
//                     backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 },
//                 {
//                     label: 'Region',
//                     data: regionData,
//                     backgroundColor: 'rgba(255, 159, 64, 0.6)',
//                 }
//             ]
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
//                         text: 'Countries'
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

// // Call fetchLocationChartData to load data and create the location chart
// fetchLocationChartData();

// async function fetchLocationChartData() {
//     try {
//         const response = await fetch('/dashboard/location_chart_data/');
//         const data = await response.json();

//         // Debugging: Log the fetched data
//         console.log('Fetched Location Chart Data:', data);

//         // Prepare data for the chart
//         const sectors = [...new Set(data.map(item => item.sector))]; // Unique sectors
//         const countries = [...new Set(data.map(item => item.country))]; // Unique countries
//         const regions = [...new Set(data.map(item => item.region))]; // Unique regions

//         // Create arrays to hold metric values for countries and regions
//         const countryData = countries.map(country => {
//             return sectors.map(sector => {
//                 const item = data.find(d => d.country === country && d.sector === sector);
//                 return item ? item.country_metric : 0; // Return country metric or 0 if not found
//             });
//         });

//         const regionData = regions.map(region => {
//             return sectors.map(sector => {
//                 const item = data.find(d => d.region === region && d.sector === sector);
//                 return item ? item.region_metric : 0; // Return region metric or 0 if not found
//             });
//         });

//         // Create the combined location chart
//         createLocationChart(sectors, countryData, regionData, countries, regions);
//     } catch (error) {
//         console.error('Error fetching location chart data:', error);
//     }
// }

// // Function to create the combined chart for Country and Region by Sectors
// function createLocationChart(sectors, countryData, regionData, countries, regions) {
//     const ctx = document.getElementById('locationChart').getContext('2d');

//     const datasets = countries.map((country, index) => ({
//         label: country,
//         data: countryData[index],
//         backgroundColor: `rgba(${index * 30}, 192, 192, 0.6)`, // Different color for each country
//     })).concat(regions.map((region, index) => ({
//         label: region,
//         data: regionData[index],
//         backgroundColor: `rgba(255, ${159 - index * 30}, 64, 0.6)`, // Different color for each region
//     })));

//     new Chart(ctx, {
//         type: 'bar', // Grouped bar chart for comparison
//         data: {
//             labels: sectors,
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
//                         text: 'Sectors'
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

// // Call fetchLocationChartData to load data and create the location chart
// fetchLocationChartData();

async function fetchLocationChartData() {
    try {
        const response = await fetch('/dashboard/location_chart_data/');
        const data = await response.json();

        // Debugging: Log the fetched data
        console.log('Fetched Location Chart Data:', data);

        // Prepare data for the chart
        const labels = [...new Set(data.map(item => item.country))]; // Unique countries
        const countryData = labels.map(country => {
            return data.filter(item => item.country === country)
                       .reduce((sum, item) => sum + item.country_metric, 0);
        });
        const regionData = labels.map(country => {
            return data.filter(item => item.country === country)
                       .reduce((sum, item) => sum + item.region_metric, 0);
        });

        // Create the combined location chart
        createLocationChart(labels, countryData, regionData);
    } catch (error) {
        console.error('Error fetching location chart data:', error);
    }
}

// Function to create the combined chart for Country and Region
function createLocationChart(labels, countryData, regionData) {
    const ctx = document.getElementById('locationChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',  // Bar chart for comparison
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Country Metrics',
                    data: countryData,
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                },
                {
                    label: 'Region Metrics',
                    data: regionData,
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
fetchLocationChartData();
