from django.urls import path

from . import views

app_name = "contact"

urlpatterns = [
    path("begar-offert/", views.request_quote, name="request_quote"),
    path("kontakt/", views.contact_us, name="contact_us"),
]
