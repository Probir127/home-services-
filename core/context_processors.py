from .models import SiteConfiguration
from contact.models import QuoteRequest, ContactMessage
from request.models import Request
from django.utils import timezone
from datetime import timedelta
import json

def site_config(request):
    """Add site configuration to all templates"""
    return {
        'site_config': SiteConfiguration.load()
    }

def admin_dashboard_stats(request):
    """
    Provide analytics data for the custom admin dashboard.
    Only loads for admin pages to avoid unnecessary queries.
    """
    if not request.path.startswith('/admin'):
        return {}
    
    if not request.user.is_authenticated or not request.user.is_staff:
        return {}
    
    today = timezone.now().date()
    yesterday = today - timedelta(days=1)
    week_ago = today - timedelta(days=7)
    
    # Today's stats
    visitors_today = Request.objects.filter(time__date=today).values('ip').distinct().count()
    visitors_yesterday = Request.objects.filter(time__date=yesterday).values('ip').distinct().count()
    quotes_today = QuoteRequest.objects.filter(created_at__date=today).count()
    messages_today = ContactMessage.objects.filter(created_at__date=today).count()
    
    # Calculate percentage change
    visitors_change = 0
    if visitors_yesterday > 0:
        visitors_change = int(((visitors_today - visitors_yesterday) / visitors_yesterday) * 100)
    
    quotes_yesterday = QuoteRequest.objects.filter(created_at__date=yesterday).count()
    quotes_change = 0
    if quotes_yesterday > 0:
        quotes_change = int(((quotes_today - quotes_yesterday) / quotes_yesterday) * 100)
    
    # Conversion rate (visitors -> quote requests)
    conversion_rate = 0
    if visitors_today > 0:
        conversion_rate = round((quotes_today / visitors_today) * 100, 1)
    
    # Last 7 days visitor data for chart
    visitor_labels = []
    visitor_data = []
    for i in range(6, -1, -1):
        date = today - timedelta(days=i)
        visitor_labels.append(date.strftime('%a'))
        count = Request.objects.filter(time__date=date).values('ip').distinct().count()
        visitor_data.append(count)
    
    # Top 5 pages
    from django.db.models import Count
    top_pages = (Request.objects
                 .filter(time__gte=timezone.now() - timedelta(days=1))
                 .values('path')
                 .annotate(count=Count('id'))
                 .order_by('-count')[:5])
    
    top_pages_labels = [item['path'][:20] + '...' if len(item['path']) > 20 else item['path'] 
                        for item in top_pages]
    top_pages_data = [item['count'] for item in top_pages]
    
    # Recent activity (last 10 items)
    recent_quotes = QuoteRequest.objects.order_by('-created_at')[:5]
    recent_messages = ContactMessage.objects.order_by('-created_at')[:5]
    
    recent_activity = []
    for quote in recent_quotes:
        recent_activity.append({
            'icon': '📋',
            'text': f'New quote request from {quote.name}',
            'time': quote.created_at.strftime('%H:%M')
        })
    
    for msg in recent_messages:
        recent_activity.append({
            'icon': '✉️',
            'text': f'Message from {msg.name}',
            'time': msg.created_at.strftime('%H:%M')
        })
    
    # Sort by time and limit to 10
    recent_activity = sorted(recent_activity, key=lambda x: x['time'], reverse=True)[:10]
    
    # New quotes count (for badge)
    new_quotes = QuoteRequest.objects.filter(created_at__gte=timezone.now() - timedelta(hours=24)).count()
    
    return {
        'visitors_today': visitors_today,
        'visitors_change': visitors_change,
        'quotes_today': quotes_today,
        'quotes_change': quotes_change,
        'messages_today': messages_today,
        'conversion_rate': conversion_rate,
        'visitor_labels': json.dumps(visitor_labels),
        'visitor_data': json.dumps(visitor_data),
        'top_pages_labels': json.dumps(top_pages_labels),
        'top_pages_data': json.dumps(top_pages_data),
        'recent_activity': recent_activity,
        'new_quotes': new_quotes,
    }
