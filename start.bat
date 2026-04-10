@echo off
:: ══════════════════════════════════════════════════════════════
:: start.bat — Démarrage rapide du portfolio Django
:: Double-cliquer pour lancer le serveur de développement
:: ══════════════════════════════════════════════════════════════

echo.
echo  ^<^Alpha/^>  Portfolio Django - Demarrage...
echo ══════════════════════════════════════════════════

set DJANGO_SETTINGS_MODULE=config.settings.development
set SECRET_KEY=dev-secret-key-portfolio-alpha-2026
set ALLOWED_HOSTS=localhost,127.0.0.1

echo.
echo  [1] Activation du virtualenv...
call venv\Scripts\activate.bat

echo  [2] Demarrage du serveur...
echo.
echo  Ouvrir dans le navigateur : http://127.0.0.1:8000
echo ══════════════════════════════════════════════════
echo.

python manage.py runserver

pause
