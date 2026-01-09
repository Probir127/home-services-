from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from request.models import Request

from contact.models import ContactMessage, QuoteRequest


@staff_member_required
@require_POST
def clear_analytics_history(request):
    """
    Clear all visitor analytics history (Request model).
    Only accessible by staff members via POST request for security.
    """
    try:
        deleted_count = Request.objects.all().delete()[0]
        return JsonResponse(
            {
                "success": True,
                "message": f"Successfully deleted {deleted_count} visitor records.",
                "deleted_count": deleted_count,
            }
        )
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@staff_member_required
@require_POST
def clear_all_data(request):
    """
    Clear ALL data: visitor analytics, quotes, and messages.
    Extremely dangerous - requires staff + POST for security.
    """
    try:
        visitors_deleted = Request.objects.all().delete()[0]
        quotes_deleted = QuoteRequest.objects.all().delete()[0]
        messages_deleted = ContactMessage.objects.all().delete()[0]

        return JsonResponse(
            {
                "success": True,
                "message": f"Successfully cleared all data: {visitors_deleted} visitors, {quotes_deleted} quotes, {messages_deleted} messages.",
                "deleted": {
                    "visitors": visitors_deleted,
                    "quotes": quotes_deleted,
                    "messages": messages_deleted,
                },
            }
        )
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)
