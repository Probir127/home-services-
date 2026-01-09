from django.contrib import messages
from django.shortcuts import redirect, render

from .forms import ContactForm, QuoteRequestForm


def request_quote(request):
    if request.method == "POST":
        form = QuoteRequestForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(
                request,
                "Tack! Vi har mottagit din offertförfrågan och återkommer så snart som möjligt.",
            )
            return redirect("request_quote")
    else:
        form = QuoteRequestForm()

    return render(request, "contact/request_quote.html", {"form": form})


def contact_us(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Tack! Ditt meddelande har skickats.")
            return redirect("contact_us")
    else:
        form = ContactForm()

    return render(request, "contact/contact.html", {"form": form})
