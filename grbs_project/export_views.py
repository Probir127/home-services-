import csv
from datetime import timedelta

from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponse
from django.utils import timezone
from request.models import Request

from contact.models import ContactMessage, QuoteRequest


@staff_member_required
def export_analytics_csv(request):
    """
    Export visitor analytics data as CSV.
    Only accessible by staff members.
    """
    # Create the HttpResponse object with CSV header
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = (
        f'attachment; filename="analytics_{timezone.now().strftime("%Y%m%d")}.csv"'
    )

    writer = csv.writer(response)
    writer.writerow(["Date", "Visitors", "Quotes", "Messages", "Conversion Rate"])

    # Last 30 days data
    for i in range(29, -1, -1):
        date = timezone.now().date() - timedelta(days=i)
        visitors = (
            Request.objects.filter(time__date=date).values("ip").distinct().count()
        )
        quotes = QuoteRequest.objects.filter(created_at__date=date).count()
        messages = ContactMessage.objects.filter(created_at__date=date).count()
        conversion = round((quotes / visitors * 100), 2) if visitors > 0 else 0

        writer.writerow(
            [date.strftime("%Y-%m-%d"), visitors, quotes, messages, f"{conversion}%"]
        )

    return response


@staff_member_required
def export_quotes_csv(request):
    """
    Export all quote requests as CSV.
    Only accessible by staff members.
    """
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = (
        f'attachment; filename="quotes_{timezone.now().strftime("%Y%m%d")}.csv"'
    )

    writer = csv.writer(response)
    writer.writerow(["Date", "Name", "Email", "Phone", "Service", "Message"])

    quotes = QuoteRequest.objects.all().order_by("-created_at")
    for quote in quotes:
        writer.writerow(
            [
                quote.created_at.strftime("%Y-%m-%d %H:%M"),
                quote.name,
                quote.email,
                quote.phone,
                quote.service.name if quote.service else "N/A",
                quote.message[:100],  # Truncate long messages
            ]
        )

    return response


@staff_member_required
def export_messages_csv(request):
    """
    Export all contact messages as CSV.
    Only accessible by staff members.
    """
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = (
        f'attachment; filename="messages_{timezone.now().strftime("%Y%m%d")}.csv"'
    )

    writer = csv.writer(response)
    writer.writerow(["Date", "Name", "Email", "Phone", "Subject", "Message"])

    messages = ContactMessage.objects.all().order_by("-created_at")
    for msg in messages:
        writer.writerow(
            [
                msg.created_at.strftime("%Y-%m-%d %H:%M"),
                msg.name,
                msg.email,
                msg.phone,
                msg.subject,
                msg.message[:100],  # Truncate long messages
            ]
        )

    return response
