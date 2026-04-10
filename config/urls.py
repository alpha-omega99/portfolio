"""
config/urls.py — Routage principal du projet.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Admin Django
    path("admin/", admin.site.urls),

    # Pages principales (core)
    path("", include("apps.core.urls")),

    # Projets
    path("projets/", include("apps.projects.urls")),

    # Contact
    path("contact/", include("apps.contact.urls")),
]

# Servir les fichiers media en développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
