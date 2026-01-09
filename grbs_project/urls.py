"""
URL configuration for grbs_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from grbs_project import analytics_views, clear_views, export_views

urlpatterns = [
    # Custom premium analytics overview (MUST be before admin/ to override django-request)
    path(
        "admin/request/request/overview/",
        analytics_views.premium_overview,
        name="premium_analytics",
    ),
    # Export endpoints (staff-only)
    path(
        "admin/export/analytics/",
        export_views.export_analytics_csv,
        name="export_analytics",
    ),
    path("admin/export/quotes/", export_views.export_quotes_csv, name="export_quotes"),
    path(
        "admin/export/messages/",
        export_views.export_messages_csv,
        name="export_messages",
    ),
    # Clear history endpoints (staff-only, POST-only)
    path(
        "admin/clear/analytics/",
        clear_views.clear_analytics_history,
        name="clear_analytics",
    ),
    path("admin/clear/all/", clear_views.clear_all_data, name="clear_all"),
    # Django admin (must come AFTER custom admin/* patterns)
    path("admin/", admin.site.urls),
    path("api/", include("grbs_project.api.urls")),
    path("", include("core.urls")),
    path("services/", include("services.urls")),
    path("", include("contact.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
