# Journal des changements

## v0.2.0 — Fri, 14 Aug 2026 01:09

Consolidation du site avant la mise en ligne. Le jalon v0.2 n'est pas terminé
pour autant : les vraies coordonnées et les redirections de domaines restent à
faire.

- **Polices auto-hébergées.** Bitter et Source Sans 3 servis depuis
  `public/fonts/`, plus rien ne part chez Google. Les deux familles sont des
  polices variables : quatre fichiers (155 ko) couvrent toutes les graisses,
  au lieu des douze qu'il aurait fallu en statique. Les deux fichiers `latin`
  sont préchargés, `latin-ext` seulement si un caractère l'exige.
- **`sitemap.xml`** ajouté ; `robots.txt` le référençait déjà et recevait un 404.
- **Données structurées `LocalBusiness`** en JSON-LD, entièrement calculées à
  partir de `src/content/site.ts`. Rien à recopier le jour où les vraies
  coordonnées remplaceront les valeurs d'exemple. Un seul champ nouveau,
  `heuresMachine`, parce que « de 8 h à 20 h » ne se lit pas par une machine.
- **Accessibilité.** Vérification automatisée (axe-core sur le DOM réellement
  rendu) : aucune violation. Trois correctifs :
  - le lien d'évitement déplace maintenant vraiment le focus (`tabindex="-1"`
    sur `<main>`) ; il faisait défiler la page sans rien changer au clavier ;
  - les quatre liens téléphoniques annonçaient une suite de chiffres sans dire
    qu'ils appelaient quelqu'un — ils portent un nom accessible ;
  - le marqueur natif de `<summary>` restait visible dans Safari, donc sur
    iPhone et iPad.
- **Contraste vérifié par calcul**, sur les deux fonds et non plus seulement sur
  blanc. Les ratios inscrits dans les jetons étaient inexacts, et l'orange était
  annoncé meilleur qu'il ne l'était (5,5:1 déclaré, 5,0:1 réel, 4,49:1 sur
  crème). L'accent passe de `#b8500f` à `#b04c0e` : 5,4:1 sur blanc, 4,8:1 sur
  crème — soit exactement ce que la documentation prétendait déjà.
- **En-têtes HTTP.** `add_header` ne s'hérite pas d'un bloc `location` à
  l'autre dans nginx : la page principale partait sans aucun en-tête de
  sécurité en production, et sans `noindex` sur dev. Répétés là où il le faut.
- Cache d'un an sur `/fonts/` dans les deux vhosts.

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
