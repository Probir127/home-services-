from django.urls import path

from . import views

urlpatterns = [
    path("", views.api_root, name="api-root"),
    path("config/", views.SiteConfigView.as_view(), name="api-config"),
    path("homepage/", views.HomePageView.as_view(), name="api-homepage"),
    path("services/", views.ServiceListView.as_view(), name="api-services"),
    path(
        "services/<str:category>/",
        views.ServiceListView.as_view(),
        name="api-services-category",
    ),
    path(
        "services/<str:category>/<slug:slug>/",
        views.ServiceDetailView.as_view(),
        name="api-service-detail",
    ),
    path("pricing/", views.PricingPackageView.as_view(), name="api-pricing"),
    path(
        "quote-request/",
        views.QuoteRequestCreateView.as_view(),
        name="api-quote-request",
    ),
    path("contact/", views.ContactMessageCreateView.as_view(), name="api-contact"),
]
