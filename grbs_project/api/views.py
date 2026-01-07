from rest_framework import generics, status
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from core.models import SiteConfiguration, HomePage
from core.models import SiteConfiguration, HomePage
from services.models import Service, PricingPackage
from contact.models import QuoteRequest, ContactMessage

from .serializers import (
    SiteConfigurationSerializer,
    HomePageSerializer,
    ServiceListSerializer,
    PricingPackageSerializer,
    ServiceDetailSerializer,
    QuoteRequestSerializer,
    ContactMessageSerializer,
)


class SiteConfigView(APIView):
    """Get site configuration (singleton)"""
    def get(self, request):
        config = SiteConfiguration.load()
        serializer = SiteConfigurationSerializer(config)
        return Response(serializer.data)


class HomePageView(APIView):
    """Get homepage content (singleton)"""
    def get(self, request):
        home = HomePage.load()
        serializer = HomePageSerializer(home, context={'request': request})
        return Response(serializer.data)


class ServiceListView(generics.ListAPIView):
    """List all active services or filter by category"""
    serializer_class = ServiceListSerializer

    def get_queryset(self):
        queryset = Service.objects.filter(active=True)
        category = self.kwargs.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class ServiceDetailView(APIView):
    """Get a single service by category and slug"""
    def get(self, request, category, slug):
        service = get_object_or_404(Service, category=category, slug=slug, active=True)
        serializer = ServiceDetailSerializer(service, context={'request': request})
        return Response(serializer.data)


class QuoteRequestCreateView(generics.CreateAPIView):
    """Submit a quote request"""
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Tack för din förfrågan! Vi kontaktar dig snart.', 'success': True},
            status=status.HTTP_201_CREATED
        )


class ContactMessageCreateView(generics.CreateAPIView):
    """Submit a contact message"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Tack för ditt meddelande! Vi återkommer så snart som möjligt.', 'success': True},
            status=status.HTTP_201_CREATED
        )


class PricingPackageView(generics.ListAPIView):
    """List all pricing packages"""
    serializer_class = PricingPackageSerializer
    queryset = PricingPackage.objects.all()


@api_view(['GET'])
def api_root(request):
    """API root endpoint with available endpoints"""
    return Response({
        'endpoints': {
            'config': '/api/config/',
            'homepage': '/api/homepage/',
            'services': '/api/services/',
            'services_by_category': '/api/services/{category}/',
            'service_detail': '/api/services/{category}/{slug}/',
            'pricing': '/api/pricing/',
            'quote_request': '/api/quote-request/',
            'contact': '/api/contact/',
        }
    })
