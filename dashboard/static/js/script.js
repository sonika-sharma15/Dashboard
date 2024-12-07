
const rowsPerPage = 10; // Number of rows per page
let currentPage = 1; // Current page number
let totalData = []; // Store fetched data

// Function to fetch data from the API
async function fetchData(page) {
    try {
        const response = await fetch(`/dashboard/table/?page=${page}&limit=${rowsPerPage}`);
        const data = await response.json();
        totalData = data.results; // Assuming your API returns data in this format
        renderTable(totalData);
        renderPagination(data.totalCount); // Pass total count to render pagination
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render the table
function renderTable(data) {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.end_year}</td>
            <td>${item.topic}</td>
            <td>${item.sector}</td>
            <td>${item.region}</td>
        `;
        tableBody.appendChild(row);
    });

    // Optionally render a chart using the fetched data
   // renderChart(data);
}

// Function to render pagination controls
function renderPagination(totalCount) {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = ''; // Clear existing pagination

    const totalPages = Math.ceil(totalCount / rowsPerPage);

    // Create "Previous" button
    const prevButton = document.createElement('li');
    prevButton.classList.add('page-item');
    prevButton.innerHTML = `<a class="page-link" href="#" aria-label="Previous">&laquo; Previous</a>`;
    
    // Disable "Previous" button if on the first page
    if (currentPage === 1) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                fetchData(currentPage);
            }
        };
    }
    paginationControls.appendChild(prevButton);

    // Create number buttons (1, 2, 3, ...)
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement('li');
        button.classList.add('page-item');
        button.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        
        if (i === currentPage) {
            button.classList.add('active'); // Highlight the current page
        }

        button.onclick = () => {
            currentPage = i;
            fetchData(currentPage);
        };

        paginationControls.appendChild(button);
    }

    // Create "Next" button
    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    nextButton.innerHTML = `<a class="page-link" href="#" aria-label="Next">Next &raquo;</a>`;
    
    // Disable "Next" button if on the last page
    if (currentPage === totalPages) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                fetchData(currentPage);
            }
        };
    }
    paginationControls.appendChild(nextButton);
}

