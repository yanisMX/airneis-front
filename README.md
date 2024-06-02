# Airneis-Front

Airneis est un site e-commerce proposant des meubles de qualité et de style pour votre intérieur. Découvrez notre sélection de meubles uniques et élégants. Le projet inclut également un dashboard côté administrateur.

## Technologies Utilisées
- Next.js (14.2.1)
- React (18)
- TypeScript (5.4.5)
- Tailwind CSS (3.4.3)
- DaisyUI (4.10.1)
- FontAwesome (6.5.2)
- Http Proxy Middleware (3.0.0)
- Prettier (3.2.5)
- ESLint (8.57.0)
- Autoprefixer (10.0.1)
- PostCSS (8)

## Prérequis
- Node.js (version 16 ou supérieure)
- npm (version 7 ou supérieure)

## Installation
Clonez le dépôt :
```bash
git clone https://github.com/votre-utilisateur/airneis-front.git
cd airneis-front
```

### Installez les dépendances :

```bash
npm install
```

Configuration des variables d'environnement :

Créez un fichier .env.local à la racine du projet et ajoutez-y les variables suivantes :

```
NEXT_PUBLIC_API_BASE_URL=https://c1bb0d8a5f1d.airneis.net
```
Démarrer le serveur de développement :

```bash
npm run dev
```

## Scripts Disponibles
npm run dev : Lance le serveur de développement.
npm run build : Compile l'application pour la production.
npm run start : Démarre l'application en mode production.
npm run lint : Exécute ESLint pour l'analyse du code.


# Structure du Projet

`src/api` : Contient les appels API pour les méthodes HTTP (get, post, patch, delete).

``src/components`` : Contient les composants réutilisables de l'application (Navbar, Footer, etc.).

``src/context`` : Contient les contextes pour l'authentification et le panier.

``src/interfaces ``: Contient les interfaces TypeScript utilisées dans le projet.

``src/pages ``: Contient les pages principales de l'application.

``src/styles ``: Contient les fichiers CSS et les configurations de Tailwind

``src/utils``: Contient une partie de la logique métier pour le panier, les cookies ou encore l'user