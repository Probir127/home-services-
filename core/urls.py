from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.home, name='home'),
    path('om-oss/', views.about, name='about'),
    path('priser/', views.prices, name='prices'),
]
