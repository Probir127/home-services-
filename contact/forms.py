from django import forms
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
