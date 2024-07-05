from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import News
from .serializers import NewsSerializer


class ActualitView(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by('-date')
    serializer_class = NewsSerializer



