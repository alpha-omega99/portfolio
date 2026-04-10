@echo off
:: ══════════════════════════════════════════════════════════════
:: security_check.bat — Lancer les tests de sécurité
:: ══════════════════════════════════════════════════════════════

echo.
echo  ^<^Alpha/^>  Tests de Securite - Portfolio Django
echo ══════════════════════════════════════════════════

set DJANGO_SETTINGS_MODULE=config.settings.development
set SECRET_KEY=dev-secret-key-portfolio-alpha-2026
set ALLOWED_HOSTS=localhost,127.0.0.1,testserver

call venv\Scripts\activate.bat
python security_tests.py

pause
