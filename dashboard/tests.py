from django.test import TestCase

# Create your tests here.
from dashboard.models import DataModel
from django.db.models import Q

filters = Q(pestle__icontains='Economic') & Q(swot__icontains='Opportunities')
data = DataModel.objects.filter(filters)
print(data.count())  # Check how many results are returned
