# BusDirect 🚌

## Présentation du projet

BusDirect est une application web qui permet de gérer les trajets d'un réseau de bus et les réservations des passagers.

J'ai réalisé ce projet pour pratiquer JavaScript, la manipulation du DOM et la gestion des données avec localStorage.

## Fonctionnalités

- Afficher la liste des trajets.
- Rechercher un trajet par ville de départ ou de destination.
- Filtrer les trajets selon leur disponibilité.
- Consulter les places disponibles dans chaque bus.
- Réserver une place pour un passager.
- Modifier une réservation (nom, téléphone et siège).
- Annuler une réservation.
- Ajouter les passagers à une liste d'attente lorsque le bus est complet.
- Attribuer automatiquement une place libérée au premier passager en attente.
- Calculer le nombre de passagers et les recettes.

## Technologies utilisées

- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6)
- LocalStorage
- JSON
- Git et GitHub

## Installation et lancement

1. Cloner le projet :

```bash
git clone https://github.com/yassinedafali/Bus-Direct-partie-2.git
```

2. Ouvrir le dossier du projet dans VS Code.

3. Lancer le fichier `index.html` avec Live Server.

4. Choisir un trajet pour accéder à la gestion des réservations.

## Organisation du projet

```text
Bus-Direct-partie-2/
│
├── index.html
├── cabine.html
├── biletts.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── store.js
│   ├── render.js
│   ├── validators.js
│   ├── reservations.js
│   ├── main-trajets.js
│   └── main-billetts.js
│
└── data/
    └── trips.json
```

## Auteur

Réalisé par **Yassine Dafali** dans le cadre de ma formation à YouCode.