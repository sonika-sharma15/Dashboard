Data Visualization Dashboard
This project is a Data Visualization Dashboard designed to provide interactive insights into complex datasets. It is built using Django for the backend, MongoDB as the database, and Chart.js for dynamic chart visualizations. The dashboard is designed to be user-friendly and highly customizable, allowing users to filter data and explore insights effectively.

Key Features
Interactive Filters:

Filters include End Year, Topics, Sector, Region, PEST, SWOT, Source, Country, and City to refine data exploration.
Dynamic updates in the dashboard based on the selected filters.
Data Visualizations:

Displays key metrics such as Intensity, Likelihood, Relevance, Year, Country, Region, and City through dynamic and interactive charts.
Uses Chart.js for real-time chart rendering, providing a visually appealing and responsive experience.
Robust Backend:

Built with Django, ensuring reliable data handling and seamless integration with MongoDB.
APIs allow efficient data fetching and manipulation.
Database Integration:

MongoDB is used to store and manage structured data.
Supports large-scale datasets with flexibility and scalability.
Responsive Frontend:

Developed using HTML, CSS, JavaScript, and Bootstrap for a clean, responsive, and modern user interface.
Technology Stack
Backend:
Django (Web framework)
Djongo (MongoDB integration for Django)
Frontend:
HTML
CSS
Bootstrap (for responsiveness)
JavaScript
Chart.js (for chart visualizations)
Database:
MongoDB
How to Run the Project
Prerequisites:
Python 3.8 or higher
MongoDB installed and running
Node.js and npm (optional for frontend dependencies)
Setup Steps:
Clone the repository:


git clone <repository_url>  
cd <repository_name>  
Install Python dependencies:


pip install -r requirements.txt  
Configure the MongoDB connection in the settings.py file:


DATABASES = {  
    'default': {  
        'ENGINE': 'djongo',  
        'NAME': 'your_database_name',  
    }  
}  
Apply migrations:


python manage.py makemigrations  
python manage.py migrate  
Start the Django development server:


python manage.py runserver  
Access the dashboard in your browser at http://127.0.0.1:8000/.

Project Workflow
Data Ingestion:

Data is ingested into MongoDB from external sources.
Filters & Queries:

Filters are used to query the database for specific insights.
Visualization:

The data is visualized using charts for better understanding.
Future Enhancements
Add support for exporting data and visualizations.
Include more chart types and advanced analytics.
Optimize database queries for better performance.
Integrate authentication and role-based access control.
Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

License
This project is licensed under the MIT License.

Acknowledgements
Django Documentation
MongoDB Community
Chart.js Documentation
Bootstrap Framework
