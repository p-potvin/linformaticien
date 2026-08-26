# Journal des changements

## v0.2.1 — Wed, 26 Aug 2026 17:42

Arrivée du logo et des vraies coordonnées. Le site n'affiche plus une seule
valeur d'exemple.

- **Coordonnées réelles** (Philippe Potvin, 438 827-4585, Sorel-Tracy, de 8 h à
  20 h du lundi au vendredi). Vérifié : `telephoneLien` correspond bien au
  numéro affiché, et `heuresMachine` (`Mo-Fr 08:00-20:00`) dit la même chose que
  la phrase française. C'était la seule paire du fichier qui pouvait diverger
  sans que ça se voie.
- **Le logo, en deux dessins et cinq fichiers.** Le mot-symbole mesure neuf fois
  plus large que haut une fois détouré : il ne rentre dans aucune rangée serrée.
  L'en-tête porte donc la marque carrée, le pied de page porte le mot-symbole.
  Nouvelle fiche `design-system/logo.html`.
- **L'en-tête débordait sur tous les téléphones.** Le mot-symbole occupait 211 px
  à côté d'un bouton en `whitespace-nowrap` : ni l'un ni l'autre ne peut
  rétrécir, donc la page partait en défilement horizontal de 320 à 414 px. À
  partir de 1024 px, le menu s'ajoutait et le débordement atteignait 106 px — le
  logo texte d'origine débordait déjà de 44 px à cette largeur, mais le texte
  pouvait se replier, ce qui masquait le problème. La marque carrée laisse
  maintenant 42 px de marge au pire cas.
- **L'accent passe de l'orange brûlé au rouge de la marque** (`#c03a37`). Le
  logo porte un rouge à 1° de teinte, le site portait un orange à 23° : assez
  proches pour avoir l'air d'une erreur. Le nouveau rouge tient 5,4:1 sur blanc
  et 4,8:1 sur crème, exactement comme l'orange qu'il remplace. Les jetons
  s'appellent maintenant `rouge` et `rouge-pale`.
- **Le bleu, lui, n'a pas bougé** : le logo est à 204° de teinte, l'interface à
  203°. C'est la même couleur en deux valeurs, et c'est très bien ainsi. Le bleu
  du logo ne tiendrait que 4,4:1 sur crème, sous le plancher — il reste réservé
  au dessin, qui est une image et non du texte.
- **Icônes.** `favicon.ico` passe de 262 ko à 15 ko et contient enfin trois
  tailles (16, 32, 48) au lieu d'une seule image de 254 px. Ajout d'une icône
  iOS de 180 px et d'une image de partage de 1200 × 630 : le mot-symbole seul se
  serait fait recadrer en bande illisible par Facebook.
- **Les dessins sources sortent de `public/`** pour `design-system/marque/`. Ils
  n'étaient référencés nulle part et partaient quand même en production, soit
  200 ko servis à personne.
- **`npm run verifier`**, branché dans `npm run build`. Il compare les trois
  copies des jetons — `theme.css`, `tokens.css` et les étiquettes affichées dans
  `couleurs.html` — et recalcule tous les contrastes. Cette troisième copie avait
  déjà dérivé deux fois : la pastille montrait la bonne couleur pendant que le
  texte à côté annonçait l'ancienne. Une couleur sous le plancher arrête
  maintenant la construction.

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
