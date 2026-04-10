"""
apps/projects/admin.py
"""
from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["number", "title", "category", "year", "is_published", "order"]
    list_editable = ["is_published", "order"]
    prepopulated_fields = {"slug": ("title",)}
