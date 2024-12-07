from django.urls import path
from .views import get_data, dashboard_view, test, chart_data, location_chart_data, pest_swot_data
from dashboard import views

urlpatterns = [
    path('get_data/', views.get_data, name='get_data'),
    path('', views.dashboard_view, name='dashboard_view'),  # Maps to /dashboard/
    path('test/', views.test, name='test'),
    path('table/', views.table, name='table'),
    path('table_filter/', views.table_filter, name='table_filter'),
    path('chart_data/', views.chart_data, name='chart_data'),
    path('location_chart_data/', views.location_chart_data, name='location_chart_data'),
    path('year_topics_chart/', views.year_topics_chart, name='year_topics_chart'),
    path('pest_swot_data/', views.pest_swot_data, name='pest_swot_data'),
    path('run_query_view/', views.run_query_view, name='run_query_view'),
       
]