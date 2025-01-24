# API de Colocation - Ma Ptit'Coloc

Ce projet propose une API RESTful pour la gestion des colocations. Elle permet de gérer les utilisateurs, les colocations, les charges et leur distribution. La documentation de l'API est disponible via Swagger.

## Fonctionnalités principales

### Utilisateurs

Création, mise à jour et suppression des utilisateurs.

Authentification et gestion des droits d'accès via JWT.

### Colocations

Gestion des entités de colocation : création, lecture, mise à jour et suppression.

Attribution d'utilisateurs à une colocation.

### Charges

Gestion des charges liées à une colocation.

Calcul et suivi des contributions individuelles.

###Distribution

Gestion de la répartition des charges entre les colocataires.

## Prérequis

Avant de démarrer, assurez-vous d'avoir installé les outils suivants :

Node.js (v16+ recommandé)

TypeScript

MongoDB et/ou MySQL

Installation

## Clonez le dépôt :

git clone <URL_DU_DEPOT>
cd <NOM_DU_DOSSIER>

### Installez les dépendances :

npm install

### Configurez les bases de données dans les fichiers suivants :

src/configs/databases/mongoose.config.ts pour MongoDB.

src/configs/databases/mysql.config.ts pour MySQL.

### Configurez les variables d'environnement en créant un fichier .env à la racine du projet :

PORT=3000
MONGODB_URI=<URI_MONGODB>
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=secret
MYSQL_DATABASE=colocation
JWT_SECRET=<VOTRE_SECRET>

### Lancez le serveur :

npm run start:dev

## Documentation Swagger

La documentation de l'API est disponible via Swagger. Pour y accéder :

Lancez le projet.

Rendez-vous à l'adresse suivante dans votre navigateur : http://localhost:3000/api-docs

Les fichiers Swagger sont situés dans le dossier : src/docs/swagger/.

## Structure du projet

src/
├── app.ts                 # Configuration principale de l'application
├── server.ts              # Démarrage du serveur
├── configs/               # Configuration des bases de données
├── controllers/           # Logique des routes
├── databases/             # Modèles et entités des bases de données
├── middlewares/           # Middleware (authentification, logs, etc.)
├── repositories/          # Accès aux données
├── routes/                # Définition des routes de l'API
├── services/              # Services pour la logique métier
├── types/                 # Typages TypeScript
├── utils/                 # Fonctions utilitaires
├── logs/                  # Fichiers de logs
└── docs/swagger/          # Documentation Swagger

## Scripts NPM

npm start: Démarrer l'application en mode production.

npm run start:dev: Démarrer l'application en mode développement avec rechargement automatique.

npm run build: Compiler le projet TypeScript en JavaScript.

Tests

Pour exécuter les tests (s'il y en a) :

npm test
