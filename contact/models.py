from django.db import models


class QuoteRequest(models.Model):
    name = models.CharField(max_length=255, verbose_name="Namn")
    email = models.EmailField(verbose_name="E-post")
    phone = models.CharField(max_length=50, verbose_name="Telefon")
    service_type = models.CharField(max_length=255, verbose_name="Typ av tjänst")
    message = models.TextField(verbose_name="Meddelande")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Quote Request"
        verbose_name_plural = "Quote Requests"

    def __str__(self):
        return f"Quote from {self.name} ({self.created_at.strftime('%Y-%m-%d')})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=255, verbose_name="Namn")
    email = models.EmailField(verbose_name="E-post")
    phone = models.CharField(max_length=50, blank=True, verbose_name="Telefon")
    subject = models.CharField(max_length=255, verbose_name="Ämne")
    message = models.TextField(verbose_name="Meddelande")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return (
            f"{self.subject} from {self.name} ({self.created_at.strftime('%Y-%m-%d')})"
        )
