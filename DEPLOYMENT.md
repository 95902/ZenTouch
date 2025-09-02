# 🚀 Guide de Déploiement ZenTouch

## 📋 Vue d'ensemble

Ce projet est configuré pour être déployé avec :
- **Frontend** : Netlify (React + Vite)
- **Backend** : Plateforme séparée (Vercel, Railway, Render, etc.)

## 🎯 Déploiement Frontend sur Netlify

### 1. Préparation
```bash
# Dans le dossier client
cd client
npm install
npm run build
```

### 2. Configuration Netlify
- Connectez-vous à [Netlify](https://netlify.com)
- Créez un nouveau site
- Déployez depuis le dossier `client/dist`

### 3. Variables d'environnement Netlify
Configurez ces variables dans Netlify :
```
VITE_API_BASE_URL=https://votre-backend-url.com
VITE_APP_ENV=production
```

### 4. Configuration du build
- **Build command** : `npm run build`
- **Publish directory** : `dist`

## 🔧 Déploiement Backend

### Option 1 : Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Option 2 : Railway
- Connectez-vous à [Railway](https://railway.app)
- Importez votre projet
- Configurez les variables d'environnement

### Option 3 : Render
- Connectez-vous à [Render](https://render.com)
- Créez un nouveau Web Service
- Pointez vers votre repository

## 🌐 Configuration des domaines

### Frontend (Netlify)
- URL automatique : `votre-site.netlify.app`
- Domaine personnalisé possible

### Backend
- URL fournie par la plateforme choisie
- Exemple : `votre-api.vercel.app`

## 🔄 Mise à jour des URLs

Après déploiement du backend, mettez à jour `VITE_API_BASE_URL` dans Netlify avec l'URL de votre API.

## 📱 Test du déploiement

1. Vérifiez que le frontend se charge
2. Testez les appels API
3. Vérifiez les fonctionnalités de réservation

## 🚨 Dépannage

### Erreur CORS
- Vérifiez que le backend autorise les requêtes depuis votre domaine Netlify
- Configurez les headers CORS appropriés

### Erreur 404 sur les routes
- Vérifiez la configuration des redirects dans `netlify.toml`
- Assurez-vous que le SPA routing fonctionne

### Problèmes d'API
- Vérifiez l'URL de l'API dans les variables d'environnement
- Testez les endpoints directement
