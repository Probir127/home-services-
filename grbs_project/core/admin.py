from django.contrib import admin
from .models import SiteConfiguration, HomePage

class SingletonModelAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Allow adding only if no instance exists
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(SingletonModelAdmin):
    pass

@admin.register(HomePage)
class HomePageAdmin(SingletonModelAdmin):
    pass
