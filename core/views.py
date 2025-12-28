from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import HomePage
from services.models import Service

def home(request):
    home_page = HomePage.load()
    featured_services = Service.objects.filter(active=True)[:6]
    return render(request, 'core/home.html', {
        'home_page': home_page,
        'featured_services': featured_services,
    })

def about(request):
    return render(request, 'core/about.html')

def prices(request):
    services = Service.objects.filter(active=True).order_by('category', 'order')
    return render(request, 'core/prices.html', {
        'services': services,
    })
