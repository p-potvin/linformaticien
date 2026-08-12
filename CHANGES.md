# Journal des changements

## v0.1.0 — Wed, 12 Aug 2026 08:32

Première charpente du projet.

- Système de design « L'Informaticien », indépendant de VaultWares Redesign : palette
  contrastée sur fond blanc, deux familles typographiques, échelle bâtie sur un corps
  de 18 px, cibles de 48 px.
- Site d'une page en québécois (fr-CA) : accueil, services, démarche, clientèle, tarif,
  questions fréquentes, coordonnées.
- Tout le texte regroupé dans `src/content/site.ts`, coordonnées encore fictives et
  marquées `À REMPLIR`.
- Feuille de style d'impression pour que la page sorte proprement sur une imprimante
  maison.
- Fiches du système de design prêtes pour Claude Design, dont le vocabulaire interdit
  et les contraintes de l'affiche imprimée.
- Brief d'affiche à coller dans Claude Design (`docs/brief-affiche.md`).
- Vérification : `npm run build` passe (TypeScript sans erreur), rendu inspecté à
  1280 px et à 375 px.
