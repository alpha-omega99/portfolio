"""
apps/core/middleware.py
Middleware de sécurité personnalisé — ajoute les en-têtes HTTP de protection.
"""


class SecurityHeadersMiddleware:
    """Injecte des en-têtes de sécurité sur chaque réponse HTTP."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Anti-clickjacking (redondant avec Django mais explicite)
        response["X-Frame-Options"] = "DENY"

        # Empêche le MIME-sniffing
        response["X-Content-Type-Options"] = "nosniff"

        # XSS protection pour les vieux navigateurs
        response["X-XSS-Protection"] = "1; mode=block"

        # Referrer policy
        response["Referrer-Policy"] = "strict-origin-when-cross-origin"

        # Permissions policy (désactiver les APIs sensibles)
        response["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"

        # Content-Security-Policy simple
        csp = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com "
            "https://fonts.googleapis.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data:; "
            "connect-src 'self';"
        )
        response["Content-Security-Policy"] = csp

        return response
