"""
apps/core/views.py — Vues pour la page d'accueil et les pages détail.
"""
from django.shortcuts import render
from apps.projects.models import Project
from .models import TimelineEntry, Service


def home(request):
    """Page d'accueil principale."""
    timeline = TimelineEntry.objects.all()[:4]
    services = Service.objects.all()[:3]
    # Seulement 3 projets sur la home — masqués visuellement
    featured_projects = Project.objects.filter(is_published=True)[:3]

    context = {
        "timeline": timeline,
        "services": services,
        "featured_projects": featured_projects,
        "page_title": "Alpha — Portfolio",
    }
    return render(request, "pages/home.html", context)


def about_detail(request):
    """Page détail du parcours."""
    timeline = TimelineEntry.objects.all()
    context = {
        "timeline": timeline,
        "page_title": "Mon Parcours — Alpha",
    }
    return render(request, "pages/about_detail.html", context)


def services_detail(request):
    """Page détail des services."""
    services = Service.objects.all()
    context = {
        "services": services,
        "page_title": "Mes Services — Alpha",
    }
    return render(request, "pages/services_detail.html", context)
