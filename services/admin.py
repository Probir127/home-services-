from django.contrib import admin

from .models import PricingPackage, Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "order", "active"]
    list_filter = ["category", "active"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
    list_editable = ["order", "active"]
    fieldsets = (
        (
            None,
            {"fields": ("title", "slug", "subtitle", "category", "active", "order")},
        ),
        (
            "Content",
            {"fields": ("description", "short_description", "features", "benefits")},
        ),
        ("Media", {"fields": ("image", "icon")}),
    )


@admin.register(PricingPackage)
class PricingPackageAdmin(admin.ModelAdmin):
    list_display = ["title", "price", "is_popular", "order"]
    list_editable = ["price", "is_popular", "order"]
    search_fields = ["title", "description"]
