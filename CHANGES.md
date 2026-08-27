# Journal des changements

## v0.4.1 — Wed, 26 Aug 2026 23:10

Retouches après le premier vrai coup d'œil à l'écran.

- **Le menu double de taille** : 24 px au lieu de 16, en gras et dans le bleu du
  logo, avec les écarts resserrés de 24 à 12 px. Au survol il passe au rouge et
  se souligne — deux signaux plutôt qu'un.
- **Conséquence assumée : le menu n'apparaît plus qu'à 1280 px.** À 24 px il
  mesure 486 px de large ; le garder dès 1024 px aurait forcé le mot-symbole à
  180 px, ce qui défaisait tout le travail précédent. Entre 1024 et 1279 px,
  l'en-tête garde le logo et les deux boutons. La page est courte, elle se
  parcourt en défilant.
- **La bande « Pour qui » passe au bleu foncé.** Même teinte à un degré près,
  mais le texte blanc y tient **7,98:1 au lieu de 4,96:1** — c'est ce qui
  manquait pour qu'il se détache. Le texte prend aussi une graisse moyenne, et
  les crochets sont maintenant dans des pastilles rondes blanches : seuls sur
  l'aplat, ils se perdaient.
- **Du rouge sur le numéro de téléphone** de la section Contact. C'est le seul
  endroit où le rouge du logo porte autre chose qu'un filet ou une puce, et ça
  suffit à le sortir du bleu ambiant.
- **Les pastilles de la section Contact deviennent rondes** elles aussi, avec le
  bleu du logo plutôt que le foncé.

## v0.4.0 — Wed, 26 Aug 2026 21:30

L'ordre des priorités du projet est arrêté noir sur blanc : **une page qui a de
l'allure passe avant une page accessible, qui passe avant un score parfait aux
outils automatiques.** Le reste de cette version en découle.

- **Un seul bleu.** Les liens reprennent `#1a75b2`, le bleu exact du
  mot-symbole. Le doublon `bleu-fonce` pour le texte disparaît — il ne sert plus
  qu'au survol. Sur la teinte, un lien tient 4,0:1 : sous la cible, au-dessus du
  plancher, et c'est assumé.
- **La teinte se voit enfin.** Le fond des bandes alternées passe de `#f2f7fb`
  à `#dbe9f5` : l'écart avec le blanc double, de 1,08 à 1,24. Il avait été
  choisi pâle pour faire passer le bleu du logo à 4,5:1 — contrainte levée.
- **Une bande pleinement bleue.** La section « Pour qui » prend le bleu du logo
  en aplat, texte blanc, cernée de noir. Le rythme de la page devient blanc,
  teinte, blanc, teinte — avec ce bloc bleu au milieu.
- **Le cerne noir du logo devient un motif.** Le mot-symbole est un aplat bleu
  cerné de noir ; boutons, cartes, questions, étiquettes et pastilles d'étapes
  reprennent ce cerne de 2 px (`--color-contour`, `#141414`). C'est le
  changement qui accorde le plus la page au dessin, et il ne coûte qu'une
  bordure.
- **Un bouton de courriel dans l'en-tête**, à côté du téléphone, plus un second
  dans le tarif. Le site comptait un seul `mailto:` pour quatre `tel:` ; il en
  compte maintenant trois. Sous 640 px le bouton de courriel s'efface : les deux
  boutons plus le numéro ne laissaient que 6 px de marge.
- **Le menu change.** « Comment ça marche » sort, « Contactez-moi » entre et
  pointe vers le bas de page. La section Contact s'intitule maintenant
  « Contactez-moi » plutôt que « Appelez-moi », puisqu'on peut aussi écrire.
- **Les heures ajoutent la fin de semaine** : de 10 h à 16 h le samedi et le
  dimanche, en plus de 8 h à 20 h en semaine. `heuresMachine` devient une liste
  de deux plages, ce que schema.org accepte tel quel.
- **`npm run verifier` suit la nouvelle règle** : il bloque sous 3:1, il signale
  entre 3 et 4,5 sans bloquer, et il garde la cible de 4,5:1 pour le corps de
  texte seulement. Les vérifications de concordance des jetons, elles, restent
  bloquantes — une couleur qui ne dit pas la même chose à trois endroits reste
  une erreur, pas un choix.
- **L'impression forçait le fond en blanc sans toucher au texte.** La nouvelle
  bande bleue serait sortie blanche sur blanc, donc vide. Le texte est
  maintenant forcé en noir lui aussi.

## v0.3.0 — Wed, 26 Aug 2026 19:05

Le site prend l'allure du logo. Le mot-symbole redessiné en 9:1 exact devient
l'élément principal de l'en-tête, et le reste de la page s'accorde à lui.

- **Le mot-symbole porte l'en-tête** à partir de 640 px : 288 px de large, puis
  396 px à partir de 1280 px. Le conteneur du site passe de 1024 à **1216 px**
  pour lui faire de la place sans écraser le menu ni le bouton. Sous 640 px, la
  marque carrée prend le relais : le mot-symbole ne rentre pas à côté du numéro.
  Mesuré au pire cas (1024 px, quand le menu apparaît alors que la fenêtre borne
  encore le conteneur) : 72 px de marge.
- **Le bleu du logo devient celui du site.** `#1a75b2` porte maintenant les
  aplats : fond des boutons, pictogrammes, pastilles des étapes. Il ne pouvait
  pas porter de texte tel quel — 4,44:1 sur l'ancien fond crème, sous le
  plancher — alors le fond des sections alternées est passé du crème chaud à une
  teinte froide (`#f2f7fb`), qui le fait tenir à 4,60:1. Ce qui se **lit** garde
  un bleu plus foncé, `#12557f` : même teinte à un degré près, mais 8:1 au lieu
  de 5:1, et le public a 65 ans et plus.
- **Plus d'empattements.** Bitter est retiré. Les titres se distinguent
  maintenant par la graisse (800) et des lettres resserrées (-0,02 em), pas par
  une deuxième police — le mot-symbole est une grasse sans empattements, et un
  titre à empattements à côté faisait deux voix. Source Sans 3 étant variable,
  la graisse 800 ne coûte rien : **66 ko de moins**, et un préchargement en
  moins dans l'en-tête.
- **Le bouton de l'en-tête maigrit** de 299 à 162 px : le libellé
  « Appelez-moi : » disparaît au profit d'un pictogramme, et les 106 px
  récupérés vont au mot-symbole. La hauteur, elle, ne bouge pas — 48 px, le
  plancher tactile. Le nom accessible reste complet.
- **Les pictogrammes viennent de `lucide-react`** au lieu des caractères ☎, ✓, •
  et + posés dans le texte. Ces caractères se font lire à voix haute par les
  lecteurs d'écran et changent de dessin d'un système à l'autre. Huit icônes
  importées, 5 ko de plus dans le paquet — largement remboursés par les 66 ko de
  la police retirée.
- **La section Contact gagne un pictogramme par ligne**, dans le `<dt>`. Premier
  jet cassé : le pictogramme était glissé entre le `<dl>` et ses `<dt>`, ce qui
  détruit la liste de définitions pour les lecteurs d'écran. axe l'a attrapé.
- **`npm run verifier` s'étend** aux textes posés sur un aplat (blanc sur bleu,
  bleu foncé sur bleu pâle) et connaît les nouveaux jetons. Il a attrapé deux
  vraies erreurs pendant ce travail : la fiche de couleurs restée sur l'ancienne
  palette, puis un remplacement trop large qui avait écrasé la pastille
  `bleu-nuit`.

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
