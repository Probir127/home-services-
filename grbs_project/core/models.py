from django.db import models
from django.core.exceptions import ValidationError

class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.pk and self.__class__.objects.exists():
            raise ValidationError(f"There can be only one {self.__class__.__name__} instance")
        return super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        if cls.objects.exists():
            return cls.objects.first()
        return cls()

    def __str__(self):
        return self._meta.verbose_name

class SiteConfiguration(SingletonModel):
    site_name = models.CharField(max_length=255, default="GRB Servicebyrå AB")
    phone = models.CharField(max_length=50, default="072 030 05 66")
    email = models.EmailField(default="info@grbs.se")
    address = models.TextField(default="Gustav III:s Boulevard 16\nSE 16972 SOLNA")
    facebook_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Site Configuration"

class HomePage(SingletonModel):
    hero_title = models.CharField(max_length=255, default="Professionell städning i Stockholm")
    hero_subtitle = models.TextField(default="Vi levererar skinande rena resultat för både privatpersoner och företag.")
    hero_image = models.ImageField(upload_to='hero/', blank=True, null=True)
    hero_cta_text = models.CharField(max_length=50, default="Begär offert")
    hero_cta_link = models.CharField(max_length=255, default="/begar-offert/")
    
    about_snippet_title = models.CharField(max_length=255, default="Om Oss")
    about_snippet_text = models.TextField(default="GRB Servicebyrå AB grundades 2017 och vi har sedan dess levererat städtjänster med högsta kvalitet.")
    about_image = models.ImageField(upload_to='about/', blank=True, null=True)

    class Meta:
        verbose_name = "Home Page Content"
