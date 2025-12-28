from django.shortcuts import render, get_object_or_404
from .models import Service

def service_list(request, category):
    services = Service.objects.filter(category=category, active=True)
    category_display = dict(Service.CATEGORY_CHOICES).get(category)
    return render(request, 'services/service_list.html', {
        'services': services,
        'category': category,
        'category_display': category_display,
    })

def private_services(request):
    return service_list(request, 'private')

def company_services(request):
    return service_list(request, 'company')

def service_detail(request, category, slug):
    service = get_object_or_404(Service, category=category, slug=slug, active=True)
    return render(request, 'services/service_detail.html', {
        'service': service,
    })
