import json
from datetime import timedelta

from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count
from django.shortcuts import render
from django.utils import timezone
from request.models import Request


@staff_member_required
def premium_overview(request):
    """
    Custom premium analytics overview with beautiful UI
    """
    # Calculate date ranges
    today = timezone.now().date()
    thirty_days_ago = today - timedelta(days=30)

    # Mega stats
    unique_visitors = Request.objects.values("ip").distinct().count()
    total_hits = Request.objects.count()
    # Unique visits = unique IP + path combinations (approximation of sessions)
    unique_visits = Request.objects.values("ip", "path").distinct().count()

    # Average per day (safe calculation)
    if Request.objects.exists():
        first_request = Request.objects.order_by("time").first()
        days_active = max((today - first_request.time.date()).days, 1)
        avg_per_day = round(total_hits / days_active)
    else:
        days_active = 1
        avg_per_day = 0

    # Traffic data for last 30 days
    traffic_labels = []
    traffic_data = []
    for i in range(29, -1, -1):
        date = today - timedelta(days=i)
        traffic_labels.append(date.strftime("%b %d"))
        count = Request.objects.filter(time__date=date).count()
        traffic_data.append(count)

    # Top paths
    top_paths = (
        Request.objects.values("path")
        .annotate(hits=Count("id"), unique=Count("ip", distinct=True))
        .order_by("-hits")[:10]
    )

    # Top referrers (safely handle empty)
    top_referrers_query = (
        Request.objects.exclude(referer="")
        .exclude(referer__isnull=True)
        .values("referer")
        .annotate(count=Count("id"))
        .order_by("-count")[:5]
    )

    top_referrers = [
        {"url": item["referer"], "count": item["count"]} for item in top_referrers_query
    ]

    # Referrers data for chart (handle empty data)
    if top_referrers:
        referrer_labels = [
            r["url"][:30] + "..." if len(r["url"]) > 30 else r["url"]
            for r in top_referrers
        ]
        referrer_data = [r["count"] for r in top_referrers]
    else:
        referrer_labels = ["No Data"]
        referrer_data = [0]

    context = {
        "unique_visitors": unique_visitors,
        "total_hits": total_hits,
        "unique_visits": unique_visits,
        "avg_per_day": avg_per_day,
        "traffic_labels": json.dumps(traffic_labels),
        "traffic_data": json.dumps(traffic_data),
        "top_paths": list(top_paths),
        "top_referrers": top_referrers,
        "referrer_labels": json.dumps(referrer_labels),
        "referrer_data": json.dumps(referrer_data),
    }

    return render(request, "request/overview.html", context)
