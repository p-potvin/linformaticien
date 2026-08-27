# Notes pour les agents

Mise à jour : Wed, 26 Aug 2026 19:05

## Portée

Dépôt **indépendant de VaultWares**. Ne pas appliquer le routeur `vaultwares-docs`, ne
pas ajouter `vaultwares-themes`, ne pas créer de chaînes bilingues, ne pas inscrire le
projet à l'inventaire des services VaultWares. Le seul emprunt volontaire au reste du
poste de travail : les PR restent obligatoires, aucun envoi direct sur `main`.

## Règles propres au projet

1. **Une seule langue : le québécois (fr-CA).** Aucune chaîne en anglais dans l'interface.
2. **Aucun jargon.** Consulter `design-system/voix-et-mots.html` avant d'écrire quoi que
   ce soit de visible. La liste des mots interdits y est tenue à jour.
3. **Tout le texte vit dans `src/content/site.ts`.** Jamais de chaîne écrite en dur dans
   un composant.
4. **Aucune couleur, taille ou espacement en dur.** Tout passe par les jetons de
   `src/styles/theme.css`.
5. **Fond blanc.** L'affiche part à l'impression ; les aplats de couleur coûtent cher.
   Le blanc du site et celui de l'affiche doivent rester les mêmes.
6. **Planchers d'accessibilité** (voir `README.md`) : 18 px, 1,65, 4,5:1, 48 px. Ce sont
   des minimums, pas des cibles.
7. **Trois copies des jetons.** `src/styles/theme.css` (Tailwind),
   `design-system/tokens.css` (CSS pur) et les étiquettes affichées dans
   `design-system/couleurs.html`. Modifier une valeur veut dire la modifier dans les
   trois. **Ne pas s'y fier de mémoire** : `npm run verifier` compare les trois et
   recalcule tous les contrastes, et il tourne dans `npm run build`. Cette troisième
   copie a déjà dérivé deux fois sans que personne le voie.
8. **Une seule famille de caractères.** Source Sans 3, en police variable. Les titres
   se distinguent par la graisse (800) et le resserrement, jamais par une deuxième
   police : le mot-symbole est une grasse sans empattements, et tout doit s'y accorder.
9. **Les pictogrammes viennent de `lucide-react`**, jamais d'un caractère Unicode
   posé dans le texte. Un ☎ ou un ✓ collé dans une phrase se fait lire à voix haute
   par les lecteurs d'écran et change de dessin selon le système.

## Affiche imprimée

Claude Code ne peut pas piloter Claude Design : aucun canal ne permet de lui envoyer une
consigne. Le seul lien est le projet de système de design, poussé avec l'outil
`DesignSync`. Le brief à coller à la main se trouve dans `docs/brief-affiche.md`.

## Version

Toute fusion vers `main` incrémente `version` dans `package.json` **et** le commentaire
`<!-- vX.Y.Z -->` en deuxième ligne de `index.html`. Jamais dans la console du
navigateur.

## Registre

Consigner le travail dans `agent-ledger` avant de répondre, comme partout ailleurs sur
ce poste de travail.
