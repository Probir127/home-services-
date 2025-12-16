from django.urls import path
from . import views

app_name = 'services'

urlpatterns = [
    path('private/', views.private_services, name='private_services'),
    path('company/', views.company_services, name='company_services'),
    path('<str:category>/<slug:slug>/', views.service_detail, name='service_detail'),
]
