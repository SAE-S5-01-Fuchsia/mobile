# Guideline du projet

## Convention de nommage et structure

### Fichiers et dossiers

- **Composants React** : PascalCase → `MonComposant.tsx`
- **Hooks** : camelCase avec préfixe `use` → `useMonHook.ts`
- **Utils/Helpers** : camelCase → `formatDate.ts`
- **Constantes** : camelCase → `theme.ts`, `colors.ts`
- **Types** : PascalCase → `User.types.ts`

---

## Workflow Git

N'oubliez pas de vous ajouter au CODEOWNERS.md pour être associé automatiquement aux PR.

### Branches

1. **Branches principales**

La branche main contiendra les releases du projet, chaque merge déclenchera le workflow de build de l'apk du projet.

La branche develop sera la branche principale sur laquelle toutes les modifications seront merge.
Ce sera la branche principale et la plus active, elle est protégée tout comme main (cf Commits).

2. **Branches secondaires**

Toute feature/fix/modification devra faire l'objet d'une branche dédiée qui doit être bien nommée (bon préfixe) puis merge sur develop.
Les exceptions (modifications directes sur develop) sont:
- changement de la version dans app.json en vue d'une release sur main
- edition du README.md, CONTRIBUTING.md, CODEOWNERS.md

```bash
Créer une branche pour chaque nouvelle fonctionnalité
git checkout -b feature/nom-de-ta-feature

# Exemples de noms de branches :
# - feature/login-screen
# - fix/button-crash
# - docs/update-readme
```

### Commits

Aucune branche comportant des commits non-vérifié (authentifié avec une clé ssh ou gpg) ne pourra être merge avec la branche develop ou main.

Tout merge devra passer par la création d'une PR. Cette PR devra être forcément acceptée par une autre personne du groupe avant de pouvoir être merge.

Tout commit lance automatiquement le linter sur les fichiers modifiés. Si des erreurs sont détectées, le commit est annulé.

Utilise des messages clairs et en français :

```bash
Exemples de messages clairs
git commit -m "Ajouter le système d'authentification"
git commit -m "Corriger le bug de rafraîchissement"
git commit -m "Mettre à jour la doc API"

Messages à éviter
git commit -m "fix"
git commit -m "update"
git commit -m "wip"
```

### Format autorisé pour les commits :

```
<type>: <description>

Types:
- feat: Nouvelle fonctionnalité
- fix: Correction de bug
- docs: Documentation
- style: Formatage (sans changement de code)
- refactor: Refactorisation
- test: Ajout de tests
- chore: Maintenance

Exemples:
feat: ajout de l'écran de profil utilisateur
fix: correction du crash au démarrage
docs: ajout du guide de contribution
```

---

## Avant de push

1. Vérifier que le code fonctionne :

   ```bash
   npx expo start
   ```

2. Lancer le linter :

   ```bash
   npm run lint
   ```

3. Lancer les tests

   ```bash
   npm test
   ```

4. Tester sur un appareil/émulateur

5. Commit et push :
   ```bash
   git add .
   git commit -m "feat: ma nouvelle fonctionnalité"
   git push origin feature/ma-feature
   ```

---

## Format des messages de commit (commitlint)

Ce dépôt applique des règles strictes sur les messages de commit via `commitlint` + `husky`. (cf. [conventionnal config](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional))

Tous les commits doivent respecter le format suivant :

- Format : `type: description`
- Le `description` **doit être en minuscules** (lower-case)
- Longueur maximum de l'en-tête (type + description) : **80 caractères**
- Aucun `scope` n'est autorisé (pas de `type(scope): description`)
- Les types autorisés sont : `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`
  Exemples valides :

```
feat: add login screen
fix: handle null user on load
docs: update README with setup
chore: bump dependencies
```

Exemples invalides :

```
feat(login): add login screen    # scope interdit
Fix: handle null user            # majuscule dans le type ou description
feat: Add Login Screen           # majuscule dans la description
feat: add a very long description that exceeds eighty characters and will be rejected
```

## Structure du projet — Emplacement des éléments

Architecture d'un projet react antive classique:

- **Pages / Routes :** `app/` — Toutes les pages et routes basées sur Expo Router (ex : `app/index.tsx`, `app/profile.tsx`).
- **Layouts & navigation :** `app/_layout.tsx`, `app/(tabs)/` — layouts, wrappers et configuration de navigation.
- **Composants réutilisables :** `components/` (ex : `components/Button.tsx`, `components/ui/` pour primitives UI).
- **Hooks personnalisés :** `hooks/` (ex : `hooks/useAuth.ts`).
- **Constantes & thème :** `constants/` (ex : `constants/theme.ts`, `constants/colors.ts`).
- **Assets (images, polices) :** `assets/` (ex : `assets/images/`, `assets/fonts/`).
- **Services / API / Clients HTTP :** `services/` ou `api/` (ex : `services/auth.ts`, `api/client.ts`).
- **Utils / Helpers :** `utils/` (ex : `utils/formatDate.ts`, `utils/fetcher.ts`).
- **Types / Interfaces TypeScript :** `types/` à la racine (ex : `types/user.d.ts`, `types/index.ts`).
- **Styles globaux / thèmes :** `styles/` ou `constants/` (ex : `styles/global.ts`, `constants/theme.ts`).
- **Scripts utilitaires :** `scripts/` (ex : `scripts/reset-project.js`).
- **Tests :** co-localise les tests avec les fichiers (`component.test.tsx` à côté du composant) ou utilise `__tests__/` pour tests d'intégration.
- **Fichiers de configuration / CI :** place-les à la racine (`.eslintrc`, `tsconfig.json`, `commitlint.config.js`, `.github/workflows/`).

Conseils :

- Co-localiser les tests et styles liés à un composant pour faciliter la maintenance.
- Regrouper une feature qui grossit dans un dossier `features/<nom>/` contenant ses composants, services et types.
- Respecter ces emplacements pour garder une structure cohérente entre les contributions.
