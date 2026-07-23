# LUNEA - site statique

Ce dossier contient un site Internet statique prêt à être mis en ligne.

## Fichiers principaux

- `index.html`: page complète du site.
- `styles.css`: design responsive.
- `script.js`: menu mobile.
- `assets/`: images optimisées utilisées par le site.

## Mise en ligne

Vous pouvez pousser le contenu de ce dossier dans un dépôt GitHub, puis connecter ce dépôt à votre hébergeur. Le fichier d'entrée est `index.html`.

Les boutons `Commander` ouvrent actuellement un email vers `contact@rituellecare.com`. Pour les relier à une boutique, remplacez les liens `mailto:` par vos liens Shopify, Stripe ou WooCommerce.

## Domaine personnalisé

Le fichier `CNAME` est déjà configuré avec :

```txt
luneadrink.com
```

Pour GitHub Pages, configurez le dépôt avec la source `main` / racine du dépôt, puis ajoutez le domaine personnalisé `luneadrink.com` dans `Settings` -> `Pages`.

Chez Obambu, la zone DNS doit pointer vers GitHub Pages :

```txt
@     A      185.199.108.153
@     A      185.199.109.153
@     A      185.199.110.153
@     A      185.199.111.153
@     AAAA   2606:50c0:8000::153
@     AAAA   2606:50c0:8001::153
@     AAAA   2606:50c0:8002::153
@     AAAA   2606:50c0:8003::153
www   CNAME  VOTRE-UTILISATEUR.github.io
```

Remplacez `VOTRE-UTILISATEUR.github.io` par le domaine GitHub Pages du compte ou de l'organisation qui héberge le dépôt.
