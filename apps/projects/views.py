"""
apps/projects/views.py
"""
from django.shortcuts import render, get_object_or_404
from .models import Project


def projects_list(request):
    """Page listant tous les projets (démasqués)."""
    projects = Project.objects.filter(is_published=True)
    context = {
        "projects": projects,
        "page_title": "Mes Réalisations — Alpha",
    }
    return render(request, "pages/projects_detail.html", context)


def project_single(request, slug):
    """Page d'un projet individuel."""
    project = get_object_or_404(Project, slug=slug, is_published=True)
    other_projects = Project.objects.filter(is_published=True).exclude(pk=project.pk)[:3]
    context = {
        "project": project,
        "other_projects": other_projects,
        "page_title": f"{project.title} — Alpha",
    }
    return render(request, "pages/project_single.html", context)
