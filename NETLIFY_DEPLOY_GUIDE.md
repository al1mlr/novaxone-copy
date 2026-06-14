# Guide de déploiement NovaXone sur Netlify avec Decap CMS

## Prérequis

- Compte GitHub (déjà disponible)
- Compte Netlify (gratuit) : https://netlify.com
- Compte Formspree (gratuit) : https://formspree.io

---

## ÉTAPE 1 : Configurer Formspree (formulaire de contact)

1. Aller sur https://formspree.io et créer un compte gratuit
2. Cliquer **"New Form"**
3. Nom : `NovaXone Contact`
4. Email de destination : `sales@novaxone.com`
5. Copier l'**ID du formulaire** (ex: `xabcdefg`)
6. Dans le fichier `client/src/components/Sections.tsx`, remplacer :
   ```
   https://formspree.io/f/xpwrqkgv
   ```
   par :
   ```
   https://formspree.io/f/VOTRE_ID_ICI
   ```
7. Commiter ce changement sur GitHub

---

## ÉTAPE 2 : Pousser le code sur GitHub

1. Créer un repository GitHub (public ou privé)
2. Dans le dossier du projet (`/home/ubuntu/novaxone-new/`) :
   ```bash
   git init
   git add .
   git commit -m "Initial commit — NovaXone site"
   git branch -M main
   git remote add origin https://github.com/VOTRE_COMPTE/novaxone.git
   git push -u origin main
   ```

---

## ÉTAPE 3 : Déployer sur Netlify

1. Aller sur https://netlify.com → **"Add new site"** → **"Import an existing project"**
2. Choisir **"Deploy with GitHub"**
3. Sélectionner votre repository
4. Vérifier les paramètres de build (Netlify les lit depuis `netlify.toml`) :
   - **Base directory** : `client`
   - **Build command** : `npm install --legacy-peer-deps && npx vite build --config ../vite.config.netlify.ts`
   - **Publish directory** : `dist`
5. Cliquer **"Deploy site"**
6. Attendre 2-3 minutes → votre site est en ligne !

---

## ÉTAPE 4 : Activer Netlify Identity (pour le CMS)

1. Dans votre projet Netlify, aller dans **Site settings** → **Identity**
2. Cliquer **"Enable Identity"**
3. Sous **"Registration"** → choisir **"Invite only"** (recommandé)
4. Sous **"Services"** → **"Git Gateway"** → cliquer **"Enable Git Gateway"**

---

## ÉTAPE 5 : Créer votre compte administrateur CMS

1. Aller sur votre site déployé → `/admin/`
   (ex: `https://votre-site.netlify.app/admin/`)
2. Cliquer **"Sign up"**
3. Entrer votre email et créer un mot de passe
4. Vérifier votre email et confirmer

---

## ÉTAPE 6 : Utiliser le CMS pour gérer le blog

1. Aller sur `https://votre-site.netlify.app/admin/`
2. Se connecter avec votre compte
3. Vous verrez deux collections :
   - **Articles Blog (Français)** : pour les articles FR
   - **Blog Articles (English)** : pour les articles EN
4. Cliquer **"New Article"** pour créer un article
5. Remplir les champs : titre, date, catégorie, résumé, contenu (Markdown)
6. Cliquer **"Publish"** → l'article est automatiquement ajouté à GitHub et le site se rebuilde en 1-2 minutes

**Note sur les images d'articles** : Pour les images de couverture, vous pouvez soit :
- Utiliser une URL externe (ex: `https://images.unsplash.com/...`)
- Uploader une image via le CMS (elle sera stockée dans `client/public/uploads/`)

**Note sur les liens de référence** : Le champ "Liens de référence" accepte du JSON au format :
```json
[{"text":"Titre du lien","href":"https://url-du-lien.com"}]
```

---

## ÉTAPE 7 : Domaine personnalisé (optionnel)

1. Dans Netlify → **Domain settings** → **"Add custom domain"**
2. Entrer `novaxone.com` (ou `new.novaxone.com` pour un sous-domaine)
3. Suivre les instructions DNS de Netlify
4. HTTPS est automatiquement configuré

---

## Coûts

| Service | Plan | Coût |
|---------|------|------|
| Netlify | Free | 0 €/mois |
| Formspree | Free (50 soumissions/mois) | 0 €/mois |
| Decap CMS | Open source | 0 € |
| Domaine | - | ~15 €/an |

**Total : 0 €/mois + 15 €/an pour le domaine**

---

## Architecture technique

```
GitHub Repository
    ↓ (push automatique via Decap CMS ou push manuel)
Netlify Build (vite build)
    ↓
Site statique déployé
    + /admin/ (Decap CMS)
    + Netlify Identity (authentification)
    + Git Gateway (écriture dans GitHub)
```

Quand vous publiez un article via le CMS :

1. Decap CMS écrit un fichier Markdown dans `client/src/content/blog/fr/` ou `client/src/content/blog/en/` sur GitHub
2. Netlify détecte le changement et rebuild automatiquement
3. Le site est mis à jour en 1-2 minutes

---

## Structure des fichiers Markdown d'articles

Les articles sont des fichiers `.md` avec un frontmatter YAML :

```markdown
---
title: "Titre de l'article"
date: "2024-01-15"
category: "Intelligence Artificielle"
excerpt: "Résumé court de l'article (1-2 phrases)"
coverImage: "/uploads/mon-image.jpg"
published: true
links: '[{"text":"Titre lien","href":"https://..."}]'
---

Contenu de l'article en Markdown...

**Titre de section**

Paragraphe de texte...

- Item de liste
- Autre item
```

---

## Dépannage

**Le CMS ne trouve pas les articles existants** : Vérifiez que les chemins dans `client/public/admin/config.yml` correspondent bien aux dossiers `client/src/content/blog/fr` et `client/src/content/blog/en`.

**Erreur "Not authenticated"** : Assurez-vous que Netlify Identity et Git Gateway sont bien activés (Étape 4).

**Le site ne se rebuild pas** : Vérifiez dans Netlify → Deploys que le build est déclenché après chaque commit.
