"""
apps/projects/models.py — Modèle Projet.
"""
from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    """Un projet du portfolio."""
    number = models.PositiveSmallIntegerField(verbose_name="Numéro", default=1)
    title = models.CharField(max_length=150, verbose_name="Titre")
    slug = models.SlugField(max_length=170, unique=True, blank=True)
    description = models.TextField(verbose_name="Description courte")
    long_description = models.TextField(
        blank=True,
        verbose_name="Description détaillée",
    )
    category = models.CharField(max_length=80, verbose_name="Catégorie")
    year = models.PositiveSmallIntegerField(verbose_name="Année")
    stack = models.CharField(
        max_length=200,
        verbose_name="Technologies (séparées par des virgules)",
        help_text="ex: HTML,CSS,Django",
    )
    url = models.URLField(blank=True, verbose_name="Lien du projet")
    is_published = models.BooleanField(default=True, verbose_name="Publié ?")
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-year"]
        verbose_name = "Projet"

    def get_stack_list(self):
        return [t.strip() for t in self.stack.split(",") if t.strip()]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
