# Bus Direct – Partie 2

**Développé par : Yassine Dafali**

## Présentation du projet

Bus Direct est une application web de gestion des trajets et des réservations de bus. Ce projet a pour objectif de faciliter la gestion des trajets, des places disponibles et des réservations des passagers à travers une interface simple et intuitive.

## Fonctionnalités réalisées

### 1. Gestion des trajets
- Création de la page des trajets.
- Affichage des cartes de trajets à partir des données.
- Préparation de la structure des données pour faciliter leur utilisation dans l'application.

### 2. Gestion de la cabine
- Création de la page cabine.
- Affichage des places du bus.
- Organisation de l'affichage des places disponibles et occupées.

### 3. Gestion des billets
- Création de la page des billets.
- Préparation de l'affichage des informations des réservations.

### 4. Gestion des réservations
Mise en place des principales opérations de réservation :
- **Réserver :** ajouter une nouvelle réservation.
- **Modifier :** modifier les informations d'une réservation existante.
- **Annuler :** supprimer une réservation.

### 5. Gestion des données
- Création et organisation du fichier `trips.json`.
- Préparation de la récupération des données avec Fetch.
- Mise en place du fichier `store.js` pour gérer les données.
- Organisation du code JavaScript en modules ES6.

### 6. Organisation et affichage
- Utilisation de `render.js` pour gérer l'affichage dynamique.
- Utilisation de `validators.js` pour la validation des données.
- Affichage dynamique des cartes à partir des données JSON.
- Séparation du code JavaScript selon les différentes pages.

## Technologies utilisées

- HTML5
- CSS3
- Tailwind CSS
- JavaScript
- Fetch API
- JSON
- LocalStorage
- ES6 Modules
- Git & GitHub

## Structure du projet

```text
Bus-Direct-partie-2/
│
├── index.html
├── cabine.html
├── biletts.html
├── README.md
│
├── data/
│   └── trips.json
│
└── js/
    ├── store.js
    ├── render.js
    ├── validators.js
    ├── reservations.js
    ├── main-trajets.js
    ├── main-cabine.js
    └── main-billetts.js
```

## Travail en cours

Le développement continue sur les autres fonctionnalités du brief Bus Direct – Partie 2, avec pour objectifs d'améliorer la gestion des données, les interactions entre les pages et l'expérience utilisateur.

## Auteur

**Yassine Dafali**

Projet réalisé dans le cadre du brief **Bus Direct – Partie 2**.