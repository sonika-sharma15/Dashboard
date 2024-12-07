#from django.db import models
from djongo import models
from bson import ObjectId


# Create your models here.   
class DataModel(models.Model):
    # id = models.ObjectIdField(primary_key=True, default=ObjectId)
    end_year = models.CharField(max_length=10, blank=True, default="")
    intensity = models.CharField(max_length=10, blank=True, default="")
    sector = models.CharField(max_length=100, blank=True, default="")
    topic = models.CharField(max_length=100, blank=True, default="")
    insight = models.TextField(max_length=100, blank=True, default="")
    url = models.URLField(max_length=100, blank=True, default="")
    region = models.CharField(max_length=100, blank=True, default="")
    start_year = models.CharField(max_length=10, blank=True, default="")
    impact = models.TextField(blank=True, default="")
    added = models.DateTimeField()
    published = models.DateTimeField()
    country = models.CharField(max_length=100, blank=True, default="")
    relevance = models.CharField(max_length=10, blank=True, default="")
    pestle = models.CharField(max_length=100, blank=True, default="")
    source = models.CharField(max_length=100, blank=True, default="")
    title = models.CharField(max_length=200, blank=True, default="")
    likelihood = models.CharField(max_length=10, blank=True, default="")
    swot = models.CharField(max_length=100, blank=True, default="")

    def __str__(self):
        return self.title