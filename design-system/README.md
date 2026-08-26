# Système de design « L'Informaticien »

Mise à jour : Wed, 26 Aug 2026 17:42

Système propre au projet. Il ne reprend **pas** VaultWares Redesign : le public, les
contraintes d'impression et le ton n'ont rien à voir.

## Ce qui a dicté les choix

| Contrainte                              | Conséquence                                                          |
| --------------------------------------- | -------------------------------------------------------------------- |
| Le public a 65 ans et plus              | Corps de texte à 18 px minimum, interlignage 1,65, cibles de 48 px    |
| L'affiche part chez l'imprimeur         | Fond blanc obligatoire, couleur en petites surfaces seulement         |
| L'affiche sera photocopiée en noir      | Le sens ne repose jamais sur la couleur seule                         |
| Les gens se méfient des fraudes         | Aucun ton d'urgence, aucune promesse floue, tout est écrit au « je »  |
| Une seule personne derrière le service  | Voix à la première personne, jamais « notre équipe »                  |

## Fichiers

| Fichier                | Contenu                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `tokens.css`           | Jetons en CSS pur, pour les contextes sans Tailwind             |
| `logo.html`            | Les deux dessins, quel fichier sortir et dans quel cas          |
| `marque/`              | Dessins sources, hors de `public/` : ils ne sont pas servis     |
| `couleurs.html`        | Palette et ratios de contraste                                  |
| `typographie.html`     | Échelle typographique, écran et papier                          |
| `boutons.html`         | Boutons, tailles, état de focus                                 |
| `cartes.html`          | Cartes de service, étapes numérotées, bloc de prix              |
| `voix-et-mots.html`    | Vocabulaire interdit et remplacements, règles d'écriture        |
| `regles-affiche.html`  | Disposition et contraintes de l'affiche 8,5 × 11 po             |

## Source de vérité

`../src/styles/theme.css` fait foi pour l'application. `tokens.css` en est une copie
manuelle destinée à l'affiche et à Claude Design : toute modification doit être portée
dans les deux fichiers.

## Synchronisation avec Claude Design

Ce dossier est poussé tel quel dans le projet de système de design **Linformaticien**
sur [claude.ai/design](https://claude.ai/design). Chaque fiche HTML porte en première
ligne un marqueur `<!-- @dsCard group="…" -->` qui la classe dans le volet Design
System.

Groupes utilisés : `Fondations`, `Composants`, `Marque`.
