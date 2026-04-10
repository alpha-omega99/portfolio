"""
apps/contact/forms.py — Formulaire de contact sécurisé.
"""
from django import forms
from .models import ContactMessage


class ContactForm(forms.ModelForm):
    """Formulaire de contact avec validation stricte."""

    class Meta:
        model = ContactMessage
        fields = ["name", "email", "message"]
        widgets = {
            "name": forms.TextInput(attrs={
                "placeholder": "Entrez votre Nom et prenom...",
                "autocomplete": "name",
            }),
            "email": forms.EmailInput(attrs={
                "placeholder": "Entrez votre Email...",
                "autocomplete": "email",
            }),
            "message": forms.Textarea(attrs={
                "placeholder": "Décrivez votre projet ou idée…",
                "rows": 5,
            }),
        }
        labels = {
            "name": "Nom",
            "email": "Email",
            "message": "Message",
        }
        error_messages = {
            "name": {"required": "Veuillez entrer votre nom."},
            "email": {
                "required": "Veuillez entrer votre email.",
                "invalid": "Adresse email invalide.",
            },
            "message": {"required": "Veuillez écrire un message."},
        }

    def clean_name(self):
        name = self.cleaned_data.get("name", "").strip()
        if len(name) < 2:
            raise forms.ValidationError("Le nom doit contenir au moins 2 caractères.")
        return name

    def clean_message(self):
        message = self.cleaned_data.get("message", "").strip()
        if len(message) < 10:
            raise forms.ValidationError("Le message doit contenir au moins 10 caractères.")
        return message
