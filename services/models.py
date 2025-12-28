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
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=50, blank=True, help_text="Font Awesome icon class, e.g. 'fa-broom'")
    image = models.ImageField(upload_to='services/', blank=True, null=True)
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
