from django.shortcuts import render
from django.http import JsonResponse
from dashboard.models import DataModel
from django.core.paginator import Paginator, EmptyPage
from django.db.models import Count
from . import views
from django.db.models import Q
import random

def get_data(request):
    # Fetch all data from DataModel and convert it to a list of dictionaries
    data = list(DataModel.objects.all().values())
    return JsonResponse(data, safe=False)



def table(request):
    page = request.GET.get('page', 1)  # Get the current page number from the query string
    limit = request.GET.get('limit', 10)  # Get the number of records per page

    # Fetch all the data from your model
    data = DataModel.objects.all()

    # Apply pagination
    paginator = Paginator(data, 10)
    page_obj = paginator.get_page('page')

    # Serialize the data
    results = list(page_obj.object_list.values('id', 'end_year', 'topic', 'sector', 'region', 'likelihood'))  # Add fields based on your model
    print("---------------------------------------------------------------------------")
    response = {
        'results': results,
        'totalCount': paginator.count,  # Total number of records
    }
    return JsonResponse(response)
   

def dashboard_view(request):
    return render(request, 'dashboard.html')

def test(request):
    return render(request, 'index.html')


def table_filter(request):
    # Get filter values from the request
    end_year = request.GET.get('end_year', '')
    topic = request.GET.get('topic', '')
    sector = request.GET.get('sector', '')
    region = request.GET.get('region', '')
    source = request.GET.get('source', '')
    country = request.GET.get('country', '')
    pestle = request.GET.get('pestle', '')  # Added PEST filter
    swot = request.GET.get('swot', '')  # Added SWOT filter
    
    # Build the filter query
    filters = Q()
    if end_year and end_year.strip():
        filters &= Q(end_year=end_year)  # Cast to int if necessary
    if topic and topic.strip():
        filters &= Q(topic__icontains=topic)
    if sector and sector.strip():
        filters &= Q(sector__icontains=sector)
    if region and region.strip():
        filters &= Q(region__icontains=region)
    if source and source.strip():
        filters &= Q(source__icontains=source)
    if country and country.strip():
        filters &= Q(country__icontains=country)
    if pestle and pestle.strip():
        filters &= Q(pestle__icontains=pestle)  # Adjust according to your field name
    if swot and swot.strip():
        filters &= Q(swot__icontains=swot)   # Use the appropriate field for SWOT
    

    try:
        # Apply filters to the query
        data = DataModel.objects.filter(filters)
        print(f"Query executed successfully. Data count: {data.count()}")
    except Exception as e:
        print(f"Error executing query: {e}")
        return JsonResponse({'error': str(e)}, status=500)

    # Pagination
    page = int(request.GET.get('page', 1))  # Default to page 1
    per_page = int(request.GET.get('per_page', 10))  # Default to 10 items per page

    paginator = Paginator(data, per_page)
    try:
        page_obj = paginator.get_page(page)  # Get the requested page

    except EmptyPage:
        page_obj = []  # Return empty if the page is out of range
    #total_count = data.count()  # Get count before slicing
    #data = data[(page - 1) * per_page: page * per_page]

    # Prepare the response data
    results = list(page_obj.object_list.values(
        'id', 'end_year', 'topic', 'sector', 'region', 'source', 'country', 'pestle', 'swot'
    ))
    total_count = paginator.count 
    #print("Filtered Results:==============================================================")  
    # Return the data as JSON
    return JsonResponse({'results': results, 'total_count': total_count})

def chart_data(request):
    # Query your DataModel to get the relevant data
    data = DataModel.objects.all().values('topic', 'intensity', 'likelihood', 'relevance')

    # Convert the queryset to a list of dictionaries
    data_list = list(data)

    return JsonResponse(data_list, safe=False)  # Return as JSON

def location_chart_data(request):
    # Query your DataModel to get relevant data for Country and Region
    data = (DataModel.objects
            .filter(country__isnull=False, country__gt='')  # Exclude empty countries
            .values('country', 'region', 'sector')
            .annotate(
                country_metric=Count('country'),  # Count occurrences per country
                region_metric=Count('region')      # Count occurrences per region
            ))

    # Convert the queryset to a list of dictionaries
    data_list = list(data)

    # Debug output
    #print("Location Chart Data:", data_list)

    return JsonResponse(data_list, safe=False)  # Return as JSON

def year_topics_chart(request):
    # Fetch and group data by `end_year` and `topic`
    data = DataModel.objects.values('end_year', 'topic')

    # Prepare data for chart by counting topics per `end_year`
    year_topic_data = {}
    for entry in data:
        end_year = entry['end_year']
        topic = entry['topic']
        
        if end_year and topic:  # Only process if `end_year` and `topic` are not empty
            if end_year not in year_topic_data:
                year_topic_data[end_year] = {}
            year_topic_data[end_year][topic] = year_topic_data[end_year].get(topic, 0) + 1

    # Convert data to a format usable by Chart.js
    labels = list(year_topic_data.keys())
    topics = set(topic for yearly_data in year_topic_data.values() for topic in yearly_data.keys())
    
    datasets = []
    for topic in topics:
        datasets.append({
            'label': topic,
            'data': [year_topic_data[year].get(topic, 0) for year in labels],
            'backgroundColor': '#' + ''.join(random.choice('0123456789ABCDEF') for _ in range(6)),
            'borderColor': '#' + ''.join(random.choice('0123456789ABCDEF') for _ in range(6)),
            'borderWidth': 1,
            'fill': False
        })

    chart_data = {
        'labels': labels,
        'datasets': datasets
    }

    return JsonResponse(chart_data)

def pest_swot_data(request):
    # Fetch all records from DataModel
    all_records = DataModel.objects.all()  # No ordering required

    # Initialize dictionaries to hold counts of PEST and SWOT values
    pest_counts = {}
    swot_counts = {}

    # Count occurrences of PEST and SWOT values
    for record in all_records:
        if record.pestle:  # Check your actual field name for PEST
            pest_counts[record.pestle] = pest_counts.get(record.pestle, 0) + 1
        if record.swot:  # Check your actual field name for SWOT
            swot_counts[record.swot] = swot_counts.get(record.swot, 0) + 1

    # Prepare the response data
    response_data = {
        'pest_counts': pest_counts,
        'swot_counts': swot_counts,
    }

    return JsonResponse(response_data)

from django.http import JsonResponse

from django.http import JsonResponse

def run_query_view(request):
    # Fetch data from the DataModel
    records = DataModel.objects.all()  # Or apply any specific filtering

    # Log the number of records
    print(f"Total records fetched: {records.count()}")
    
    # Process records for year and topic
    year_counts = {}
    topic_counts = {}
    
    for record in records:
        year = record.end_year
        topic = record.topic
        
        # Update year counts, skipping empty years
        if year:  # Only count if year is not empty
            year_counts[year] = year_counts.get(year, 0) + 1
        
        # Update topic counts, skipping empty topics
        if topic:  # Only count if topic is not empty
            topic_counts[topic] = topic_counts.get(topic, 0) + 1
        
    print(f"Year counts: {year_counts}")
    print(f"Topic counts: {topic_counts}")

    # Prepare the data for chart
    year_data = [{"year": year, "count": count} for year, count in year_counts.items()]
    topic_data = [{"topic": topic, "count": count} for topic, count in topic_counts.items()]

    # Prepare the final response data
    response_data = {
        "year_counts": year_data,
        "topic_counts": topic_data,
    }

    return JsonResponse(response_data, safe=False)  # Return your JSON response here
