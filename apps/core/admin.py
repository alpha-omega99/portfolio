"""
apps/core/admin.py
"""
from django.contrib import admin
from .models import TimelineEntry, Service


@admin.register(TimelineEntry)
class TimelineEntryAdmin(admin.ModelAdmin):
    list_display = ["years", "title", "is_active", "order"]
    list_editable = ["is_active", "order"]


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "order"]
    list_editable = ["order"]
