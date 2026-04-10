"""
apps/contact/models.py — Sauvegarde des messages de contact.
"""
from django.db import models


class ContactMessage(models.Model):
    """Message reçu via le formulaire de contact."""
    name = models.CharField(max_length=100, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    message = models.TextField(verbose_name="Message")
    is_read = models.BooleanField(default=False, verbose_name="Lu ?")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"

    def __str__(self):
        return f"{self.name} ({self.email}) — {self.created_at:%d/%m/%Y}"
