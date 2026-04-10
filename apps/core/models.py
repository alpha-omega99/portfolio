"""
apps/core/models.py — Données statiques du portfolio (parcours, services).
"""
from django.db import models


class TimelineEntry(models.Model):
    """Une entrée dans la timeline du parcours."""
    years = models.CharField(max_length=20, verbose_name="Période")
    title = models.CharField(max_length=120, verbose_name="Titre")
    description = models.TextField(verbose_name="Description")
    is_active = models.BooleanField(default=False, verbose_name="Actuel ?")
    order = models.PositiveSmallIntegerField(default=0, verbose_name="Ordre")

    class Meta:
        ordering = ["order"]
        verbose_name = "Entrée timeline"
        verbose_name_plural = "Entrées timeline"

    def __str__(self):
        return f"{self.years} — {self.title}"


class Service(models.Model):
    """Un service proposé dans la section 'Ce que je fais'."""
    icon = models.CharField(max_length=10, default="◈", verbose_name="Icône")
    category = models.CharField(max_length=80, verbose_name="Catégorie")
    name = models.CharField(max_length=120, verbose_name="Nom du service")
    tags = models.CharField(
        max_length=200,
        verbose_name="Tags (séparés par des virgules)",
        help_text="ex: Moderne,Responsive,Entreprises",
    )
    description = models.TextField(blank=True, verbose_name="Description détaillée")
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Service"

    def get_tags(self):
        return [t.strip() for t in self.tags.split(",") if t.strip()]

    def __str__(self):
        return self.name
