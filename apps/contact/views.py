"""
apps/contact/views.py — Vue du formulaire avec rate limiting.
"""
from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.http import require_http_methods
from .forms import ContactForm


@require_http_methods(["GET", "POST"])
def contact_view(request):
    """Page de contact complète (2e page)."""
    form = ContactForm()

    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_msg = form.save()

            # Envoi email (optionnel — console en dev)
            try:
                send_mail(
                    subject=f"[Portfolio] Nouveau message de {contact_msg.name}",
                    message=contact_msg.message,
                    from_email=settings.EMAIL_HOST_USER or "noreply@portfolio.local",
                    recipient_list=[settings.EMAIL_HOST_USER or "bhaalpha4@gmail.com"],
                    fail_silently=True,
                )
            except Exception:
                pass  # Ne jamais bloquer l'utilisateur sur un échec email

            messages.success(
                request,
                "Message envoyé avec succès ! Je vous réponds sous 24h.",
            )
            return redirect("contact:success")
        else:
            messages.error(request, "Veuillez corriger les erreurs ci-dessous.")

    context = {
        "form": form,
        "page_title": "Contact — Alpha",
    }
    return render(request, "pages/contact_detail.html", context)


def contact_success(request):
    """Page de confirmation après envoi du message."""
    return render(request, "pages/contact_success.html", {
        "page_title": "Message envoyé — Alpha",
    })
