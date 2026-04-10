"""
setup_initial_data.py
Charge les données initiales (timeline, services, projets) dans la BDD.
Exécuter avec : python setup_initial_data.py
"""
import os
import sys
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
os.environ.setdefault("SECRET_KEY", "setup-key-change-me")
os.environ.setdefault("ALLOWED_HOSTS", "localhost,127.0.0.1")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from apps.core.models import TimelineEntry, Service
from apps.projects.models import Project

# ─── Timeline ────────────────────────────────────────────────────────────────
print("Création de la timeline...")
TimelineEntry.objects.all().delete()
entries = [
    {"years": "2018–2025", "title": "Étudiant & curieux",
     "description": "Apprentissage continu, passion pour la connaissance et la recherche.",
     "is_active": False, "order": 1},
    {"years": "2022–2026", "title": "Autodidacte digital",
     "description": "Plongée dans le développement web : HTML, CSS, JavaScript, Python.",
     "is_active": False, "order": 2},
    {"years": "2024–2026", "title": "E-commerce",
     "description": "Création et gestion d'une boutique en ligne de A à Z.",
     "is_active": False, "order": 3},
    {"years": "2026 →", "title": "Solutions digitales",
     "description": "Accompagnement de particuliers & entreprises vers leurs objectifs en ligne.",
     "is_active": True, "order": 4},
]
for e in entries:
    TimelineEntry.objects.create(**e)
print(f"  ✓ {len(entries)} entrées timeline créées")

# ─── Services ─────────────────────────────────────────────────────────────────
print("Création des services...")
Service.objects.all().delete()
services = [
    {"icon": "◈", "category": "Web Design", "name": "Sites Vitrines",
     "tags": "Moderne,Responsive,Entreprises,Particuliers",
     "description": "Création de sites vitrines modernes, rapides et responsive.",
     "order": 1},
    {"icon": "◇", "category": "Identité Digitale", "name": "CV & Portfolios",
     "tags": "Personnalisation,Design pro,Mise en valeur",
     "description": "Valorisez votre profil professionnel avec un portfolio percutant.",
     "order": 2},
    {"icon": "○", "category": "Bureautique", "name": "Suite Microsoft",
     "tags": "Word,Excel,PowerPoint",
     "description": "Maîtrise avancée de la Suite Microsoft Office.",
     "order": 3},
    {"icon": "▣", "category": "E-commerce", "name": "Boutiques en ligne",
     "tags": "Shopify,WooCommerce,Gestion produits",
     "description": "Création et gestion complète de boutiques e-commerce.",
     "order": 4},
]
for s in services:
    Service.objects.create(**s)
print(f"  ✓ {len(services)} services créés")

# ─── Projets ──────────────────────────────────────────────────────────────────
print("Création des projets...")
Project.objects.all().delete()
projects = [
    {"number": 1, "title": "Site Vitrine Entreprise",
     "description": "Création d'un site vitrine moderne et responsive pour une entreprise locale.",
     "long_description": "Ce projet consistait à concevoir et développer un site vitrine complet pour une PME locale. Chaque section a été pensée pour maximiser l'impact visuel et la conversion.",
     "category": "Web", "year": 2025, "stack": "HTML,CSS,JavaScript",
     "is_published": True, "order": 1},
    {"number": 2, "title": "Boutique E-commerce",
     "description": "Création et gestion d'une boutique en ligne complète de A à Z.",
     "long_description": "Mise en place d'une boutique Shopify avec intégration des paiements, gestion des stocks et optimisation du parcours d'achat.",
     "category": "E-commerce", "year": 2024, "stack": "Shopify,Liquid,Design",
     "is_published": True, "order": 2},
    {"number": 3, "title": "Portfolio Professionnel",
     "description": "Design et personnalisation de portfolios professionnels sur mesure.",
     "long_description": "Conception et développement d'un portfolio Django avec animations, sections dynamiques et formulaire de contact sécurisé.",
     "category": "Portfolio", "year": 2025, "stack": "HTML,CSS,Django,Python",
     "is_published": True, "order": 3},
]
for p in projects:
    Project.objects.create(**p)
print(f"  ✓ {len(projects)} projets créés")

print("\n✅ Données initiales chargées avec succès !")
print("   Démarrez le serveur : python manage.py runserver")
