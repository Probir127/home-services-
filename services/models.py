from django.db import models
from django.utils.text import slugify

class Service(models.Model):
    CATEGORY_CHOICES = [
        ('private', 'Privata tjänster'),
        ('company', 'Företag tjänster'),
    ]
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    short_description = models.TextField(blank=True, help_text="Short description for the card view")
    subtitle = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=50, blank=True, help_text="Font Awesome icon class, e.g. 'fa-broom'")
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    features = models.JSONField(default=list, blank=True, help_text="List of features")
    benefits = models.JSONField(default=list, blank=True, help_text="List of benefits")
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"

class PricingPackage(models.Model):
    title = models.CharField(max_length=255)
    price = models.CharField(max_length=100, help_text="e.g. 'fr. 299 kr/tim'")
    description = models.TextField(blank=True)
    features = models.JSONField(default=list, help_text="List of features included")
    is_popular = models.BooleanField(default=False)
    cta_text = models.CharField(max_length=50, default="Välj paket")
    cta_link = models.CharField(max_length=255, default="/kontakt")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', 'title']
    
    def __str__(self):
        return self.title
