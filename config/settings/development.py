"""
config/settings/development.py
Settings pour le développement local.
"""
from .base import *  # noqa: F401, F403
from decouple import config

DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"]

# Barre de debug (optionnelle — décommentez si installée)
# INSTALLED_APPS += ["debug_toolbar"]
# MIDDLEWARE = ["debug_toolbar.middleware.DebugToolbarMiddleware"] + MIDDLEWARE

# En dev, on affiche les emails dans la console
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
