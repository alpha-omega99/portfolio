"""
config/settings/production.py
Settings pour la production — DEBUG toujours False.
"""
from .base import *  # noqa: F401, F403
from decouple import config

DEBUG = True

ALLOWED_HOSTS = [
    'portfolio-d2cz.onrender.com',
    '.onrender.com',  # Matches any Render subdomain
    '127.0.0.1',
    'localhost',
]

# HTTPS forcé en production
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000          # 1 an
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
CSRF_TRUSTED_ORIGINS = config(
    "CSRF_TRUSTED_ORIGINS", default="https://*.onrender.com"
).split(",")
