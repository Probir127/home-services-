from rest_framework import serializers
import re
from django.utils.html import strip_tags
from core.models import SiteConfiguration, HomePage
from core.models import SiteConfiguration, HomePage
from services.models import Service, PricingPackage
from contact.models import QuoteRequest, ContactMessage


class SiteConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = [
            'site_name', 'phone', 'email', 'address',
            'facebook_url', 'instagram_url', 'linkedin_url', 'twitter_url'
        ]


class HomePageSerializer(serializers.ModelSerializer):
    hero_image_url = serializers.SerializerMethodField()
    about_image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomePage
        fields = [
            'hero_title', 'hero_subtitle', 'hero_image_url',
            'hero_cta_text', 'hero_cta_link',
            'about_snippet_title', 'about_snippet_text', 'about_image_url'
        ]

    def get_hero_image_url(self, obj):
        if obj.hero_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.hero_image.url)
            return obj.hero_image.url
        return None

    def get_about_image_url(self, obj):
        if obj.about_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.about_image.url)
            return obj.about_image.url
        return None


class ServiceListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'title', 'slug', 'description', 'short_description', 'subtitle', 'category', 'category_display', 'icon', 'image_url', 'features', 'benefits', 'order']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ServiceDetailSerializer(ServiceListSerializer):
    related_services = serializers.SerializerMethodField()

    class Meta(ServiceListSerializer.Meta):
        fields = ServiceListSerializer.Meta.fields + ['related_services']

    def get_related_services(self, obj):
        related = Service.objects.filter(category=obj.category, active=True).exclude(id=obj.id)[:4]
        return ServiceListSerializer(related, many=True, context=self.context).data


class PricingPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingPackage
        fields = ['id', 'title', 'price', 'description', 'features', 'is_popular', 'cta_text', 'cta_link', 'order']


class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = ['name', 'email', 'phone', 'service_type', 'message']
        extra_kwargs = {
            'name': {'min_length': 2, 'max_length': 100},
            'email': {'max_length': 255},
            'phone': {'max_length': 20},
            'service_type': {'max_length': 100},
            'message': {'max_length': 2000},
        }

    def validate_phone(self, value):
        # Basic phone validation: allow digits, spaces, plus, and dashes
        if not re.match(r'^\+?[\d\s\-]{7,20}$', value):
            raise serializers.ValidationError("Ange ett giltigt telefonnummer.")
        return value

    def validate_name(self, value):
        return strip_tags(value).strip()

    def validate_message(self, value):
        return strip_tags(value).strip()


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message']
        extra_kwargs = {
            'name': {'min_length': 2, 'max_length': 100},
            'email': {'max_length': 255},
            'phone': {'max_length': 20},
            'subject': {'min_length': 3, 'max_length': 200},
            'message': {'max_length': 2000},
        }

    def validate_phone(self, value):
        if value and not re.match(r'^\+?[\d\s\-]{7,20}$', value):
            raise serializers.ValidationError("Ange ett giltigt telefonnummer.")
        return value

    def validate_name(self, value):
        return strip_tags(value).strip()

    def validate_subject(self, value):
        return strip_tags(value).strip()

    def validate_message(self, value):
        return strip_tags(value).strip()
