# Portfolio — Sofiane Mahiout

Site portfolio cybersécurité avec esthétique "security ops" : terminal de boot animé, transition Access Denied → Granted, et profil détaillé.

## Structure

```
portfolio/
├── index.html      # Structure du site (HTML)
├── styles.css      # Tous les styles (palette bleu nuit + vert menthe)
├── script.js       # Animations terminal + interactions
└── README.md       # Ce fichier
```

## Tester en local

Ouvre simplement `index.html` dans ton navigateur (double-clic). Tout fonctionne en local, sauf 2 dépendances chargées via CDN :

- **Google Fonts** (Rajdhani + JetBrains Mono)
- **Phosphor Icons** (icônes du footer/socials)

Si tu n'as pas internet, télécharge ces ressources et héberge-les en local.

## À personnaliser avant la mise en ligne

### 1. Lien LinkedIn

Cherche `linkedin.com/in/sofiane-mahiout` dans `index.html` (2 occurrences) et remplace par ton vrai profil.

### 2. Localisation

Dans `index.html`, cherche `Chambéry, FR` et `Chambéry, Auvergne-Rhône-Alpes` pour ajuster.

### 3. À propos / Expériences / Formations

Tout est dans `index.html` dans les sections `<article id="about">`, `<article id="experience">`, `<article id="formations">`. Modifie le texte directement.

### 4. Pseudo terminal

Dans `script.js`, cherche `'Sofiane'` dans la `grantedSequence` pour changer l'alias affiché.

## Mettre en ligne (3 options gratuites)

### Option A — GitHub Pages (recommandé)

1. Crée un repo GitHub `sofiane-mahiout-portfolio` (ou autre nom).
2. Push les 3 fichiers (`index.html`, `styles.css`, `script.js`) à la racine.
3. Settings → Pages → Source : `main` branch, dossier `/ (root)`.
4. Ton site sera dispo à `https://<ton-username>.github.io/sofiane-mahiout-portfolio/`.

### Option B — Netlify (drag & drop)

1. Va sur [netlify.com](https://netlify.com), crée un compte.
2. Drag & drop le dossier `portfolio/` sur la page d'accueil.
3. Site dispo en quelques secondes avec une URL `xxx.netlify.app`.
4. Tu peux acheter un domaine custom plus tard (ex: `sofianemahiout.com`).

### Option C — Vercel

1. Va sur [vercel.com](https://vercel.com), connecte ton GitHub.
2. Import du repo, deploy automatique.
3. Idem Netlify, URL `xxx.vercel.app` instantanée.

## Roadmap (idées d'améliorations)

- Ajouter une page Write-ups (CTF, vulns trouvées)
- Section Ranking dynamique (HTB, RootMe via API)
- Effet glitch sur le titre au hover
- Mode "light" optionnel (mais le dark colle parfaitement au thème)
- Préchargement des fonts pour éviter le flash

---

Sofiane Mahiout © 2025
