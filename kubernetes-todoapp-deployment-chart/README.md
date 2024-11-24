# **Todo App Helm Chart**

Ce chart Helm déploie une application microservices Todo App comprenant :  
- **Frontend** : Interface utilisateur basée sur React (ou autre framework).  
- **Backend** : API développée en Node.js (ou autre langage).  
- **Base de données** : PostgreSQL pour la gestion des données.

## **Structure du Chart**

todoapp/ ├── charts/ # Sous-charts pour les dépendances (PostgreSQL) ├── templates/ # Templates YAML pour Kubernetes │ ├── deployment-backend.yaml # Déploiement du backend │ ├── deployment-frontend.yaml # Déploiement du frontend │ ├── service-backend.yaml # Service exposant l'API backend │ ├── service-frontend.yaml # Service exposant le frontend │ ├── configmap.yaml # ConfigMap pour les variables d'environnement │ ├── secret.yaml # Secret pour les informations sensibles │ ├── pvc.yaml # PersistentVolumeClaim pour PostgreSQL │ └── NOTES.txt # Instructions après déploiement ├── values.yaml # Valeurs par défaut pour les templates ├── Chart.yaml # Métadonnées du chart Helm └── README.md # Documentation du chart

