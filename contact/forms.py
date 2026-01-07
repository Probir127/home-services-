from django import forms
import re
from django.utils.html import strip_tags
from .models import QuoteRequest, ContactMessage

class QuoteRequestForm(forms.ModelForm):
    class Meta:
        model = QuoteRequest
        fields = ['name', 'email', 'phone', 'service_type', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ditt namn'}),
            'email': forms.EmailInput(attrs={'class': 'form-input', 'placeholder': 'Din e-post'}),
            'phone': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ditt telefonnummer'}),
            'service_type': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Typ av tjänst'}),
            'message': forms.Textarea(attrs={'class': 'form-textarea', 'placeholder': 'Beskriv dina behov...', 'rows': 5}),
        }

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if not re.match(r'^\+?[\d\s\-]{7,20}$', phone):
            raise forms.ValidationError("Ange ett giltigt telefonnummer.")
        return phone

    def clean_name(self):
        return strip_tags(self.cleaned_data.get('name')).strip()

    def clean_message(self):
        return strip_tags(self.cleaned_data.get('message')).strip()

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ditt namn'}),
            'email': forms.EmailInput(attrs={'class': 'form-input', 'placeholder': 'Din e-post'}),
            'phone': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ditt telefonnummer'}),
            'subject': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ämne'}),
            'message': forms.Textarea(attrs={'class': 'form-textarea', 'placeholder': 'Ditt meddelande...', 'rows': 5}),
        }

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if phone and not re.match(r'^\+?[\d\s\-]{7,20}$', phone):
            raise forms.ValidationError("Ange ett giltigt telefonnummer.")
        return phone

    def clean_name(self):
        return strip_tags(self.cleaned_data.get('name')).strip()

    def clean_subject(self):
        return strip_tags(self.cleaned_data.get('subject')).strip()

    def clean_message(self):
        return strip_tags(self.cleaned_data.get('message')).strip()
