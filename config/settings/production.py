"""
config/settings/production.py
Settings pour la production — DEBUG toujours False.
"""
from .base import *  # noqa: F401, F403
from decouple import config

DEBUG = False

# HTTPS forcé en production
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000          # 1 an
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
