# 🚀 Déploiement Backend sur Render

## 📋 Prérequis

- Compte [Render](https://render.com) (gratuit)
- Repository GitHub avec votre code
- Base de données PostgreSQL (Render propose Neon gratuitement)

## 🔧 Étape 1 : Préparation du Repository

### 1.1 Structure des fichiers
Assurez-vous que votre repository contient :
```
server/
├── index.ts
├── package.json
├── routes.ts
├── storage.ts
└── vite.ts
shared/
└── schema.ts
render.yaml
```

### 1.2 Commit et Push
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## 🌐 Étape 2 : Création du projet sur Render

### 2.1 Connexion à Render
1. Allez sur [render.com](https://render.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "New +" → "Web Service"

### 2.2 Configuration du service
- **Name** : `zentouch-backend`
- **Environment** : `Node`
- **Region** : Choisissez la plus proche de vos utilisateurs
- **Branch** : `main`
- **Root Directory** : `server` (important !)

### 2.3 Configuration du build
- **Build Command** : `npm install && npm run build`
- **Start Command** : `npm start`

## 🔑 Étape 3 : Variables d'environnement

Dans Render, allez dans "Environment" et ajoutez :

```
NODE_ENV=production
PORT=10000
DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_random_secret_key
```

### 3.1 Base de données Neon (gratuit)
1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte et un projet
3. Copiez l'URL de connexion
4. Ajoutez-la comme `DATABASE_URL` dans Render

### 3.2 Clé de session
Générez une clé aléatoire pour `SESSION_SECRET` :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚀 Étape 4 : Déploiement

### 4.1 Premier déploiement
1. Cliquez sur "Create Web Service"
2. Render va automatiquement :
   - Cloner votre repository
   - Installer les dépendances
   - Construire le projet
   - Démarrer le service

### 4.2 Vérification
- **Status** : Doit être "Live"
- **URL** : Notez l'URL fournie (ex: `https://zentouch-backend.onrender.com`)

## 🔄 Étape 5 : Mise à jour du Frontend

### 5.1 Variables d'environnement Netlify
Mettez à jour dans Netlify :
```
VITE_API_BASE_URL=https://votre-backend-url.onrender.com
```

### 5.2 Test de l'API
Testez votre API :
```bash
curl https://votre-backend-url.onrender.com/api/services
```

## 🚨 Dépannage

### Erreur de build
- Vérifiez que le dossier `server` contient un `package.json`
- Vérifiez que `render.yaml` est à la racine

### Erreur de démarrage
- Vérifiez les variables d'environnement
- Vérifiez que le port est correct (10000)

### Erreur de base de données
- Vérifiez l'URL de la base de données
- Vérifiez que la base est accessible depuis Render

## 📱 Test final

1. **Backend** : `https://votre-backend.onrender.com/api/services`
2. **Frontend** : Vérifiez que les prestations se chargent
3. **Réservation** : Testez le processus de réservation

## 🔄 Déploiements automatiques

Render se redéploie automatiquement à chaque push sur la branche `main`.
