import json
import datetime
#import os
from django.core.management.base import BaseCommand
from django.utils import timezone
from dashboard.models import DataModel  # Replace 'your_app' with your actual app name

class Command(BaseCommand):
    help = 'Load data from a JSON file into the MongoDB database'

    def handle(self, *args, **kwargs):
        # Open the JSON file and load the data
        import pdb;pdb.set_trace()
        with open("C:\\Users\\SONIKA SHARMA\\Downloads\\jsondata1.json", 'r', encoding='utf-8') as file:  # Replace with the actual path to your JSON file
            data_list = json.load(file)


        for item in data_list:
            try:
                # Convert date strings to naive datetime objects
                added_str = item.get('added', '')
                published_str = item.get('published', '')

                added_naive = datetime.datetime.strptime(added_str, '%B, %d %Y %H:%M:%S') if added_str else None
                published_naive = datetime.datetime.strptime(published_str, '%B, %d %Y %H:%M:%S') if published_str else None

                # Convert naive datetime to timezone-aware datetime
                added = timezone.make_aware(added_naive, timezone.get_current_timezone()) if added_naive else None
                published = timezone.make_aware(published_naive, timezone.get_current_timezone()) if published_naive else None

                # Parse and create a new Data object
                data = DataModel(
                    end_year=item.get('end_year', ''),
                    intensity=item.get('intensity') if item.get('intensity') else 0,
                    sector=item.get('sector', ''),
                    topic=item.get('topic', ''),
                    insight=item.get('insight', ''),
                    url=item.get('url', ''),
                    region=item.get('region', ''),
                    start_year=item.get('start_year', ''),
                    impact=item.get('impact', ''),
                    added=added,
                    published=published,
                    country=item.get('country', ''),
                    relevance=item.get('relevance', 0),
                    pestle=item.get('pestle', ''),
                    source=item.get('source', ''),
                    title=item.get('title', ''),
                    likelihood=item.get('likelihood', 0),
                    swot=item.get('swot', 0)
                )
                
                # Save the Data object to MongoDB
                data.save()

            except ValueError as e:
                self.stdout.write(self.style.ERROR(f'Error processing item: {e}'))

        self.stdout.write(self.style.SUCCESS('Data loaded successfully!'))
