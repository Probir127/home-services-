from django.contrib import admin
from .models import QuoteRequest, ContactMessage

@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'service_type', 'created_at']
    list_filter = ['created_at', 'service_type']
    search_fields = ['name', 'email', 'phone', 'message']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'
