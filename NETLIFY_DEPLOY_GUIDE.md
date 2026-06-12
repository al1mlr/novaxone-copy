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

## ÉTAPE 2 : Déployer sur Netlify

1. Aller sur https://netlify.com → **"Add new site"** → **"Import an existing project"**
2. Choisir **"Deploy with GitHub"**
3. Sélectionner votre repository `novaxone-copy` (ou le nom que vous avez donné)
4. Vérifier les paramètres de build :
   - **Base directory** : `client`
   - **Build command** : `pnpm run build`
   - **Publish directory** : `client/dist`
5. Cliquer **"Deploy site"**
6. Attendre 2-3 minutes → votre site est en ligne !

---

## ÉTAPE 3 : Activer Netlify Identity (pour le CMS)

1. Dans votre projet Netlify, aller dans **Site settings** → **Identity**
2. Cliquer **"Enable Identity"**
3. Sous **"Registration"** → choisir **"Invite only"** (recommandé)
4. Sous **"Services"** → **"Git Gateway"** → cliquer **"Enable Git Gateway"**

---

## ÉTAPE 4 : Créer votre compte administrateur CMS

1. Aller sur votre site déployé → `/admin/`
   (ex: `https://votre-site.netlify.app/admin/`)
2. Cliquer **"Sign up"**
3. Entrer votre email et créer un mot de passe
4. Vérifier votre email et confirmer

---

## ÉTAPE 5 : Utiliser le CMS pour gérer le blog

1. Aller sur `https://votre-site.netlify.app/admin/`
2. Se connecter avec votre compte
3. Vous verrez deux collections :
   - **Articles Blog (Français)** : pour les articles FR
   - **Blog Articles (English)** : pour les articles EN
4. Cliquer **"New Article"** pour créer un article
5. Remplir les champs : titre, date, catégorie, résumé, contenu (Markdown)
6. Cliquer **"Publish"** → l'article est automatiquement ajouté à GitHub et le site se rebuilde

---

## ÉTAPE 6 : Domaine personnalisé (optionnel)

1. Dans Netlify → **Domain settings** → **"Add custom domain"**
2. Entrer `novaxone.com` (ou `new.novaxone.com` pour un sous-domaine)
3. Suivre les instructions DNS de Netlify
4. HTTPS est automatiquement configuré

---

## Coûts

| Service | Plan | Coût |
|---------|------|------|
| Netlify | Free | 0€/mois |
| Formspree | Free (50 soumissions/mois) | 0€/mois |
| Decap CMS | Open source | 0€ |
| Domaine | - | ~15€/an |

**Total : 0€/mois + 15€/an pour le domaine**

---

## Architecture technique

```
GitHub Repository
    ↓ (push automatique)
Netlify Build (pnpm build)
    ↓
Site statique déployé
    + /admin/ (Decap CMS)
    + Netlify Identity (authentification)
    + Git Gateway (écriture dans GitHub)
```

Quand vous publiez un article via le CMS :
1. Decap CMS écrit un fichier Markdown dans GitHub
2. Netlify détecte le changement et rebuild automatiquement
3. Le site est mis à jour en 1-2 minutes
