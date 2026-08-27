# L'Informaticien

Site vitrine pour un service de dépannage informatique à domicile, destiné à une
clientèle âgée peu à l'aise avec la technologie.

Dernière mise à jour : Thu, 27 Aug 2026 02:10

## Projet indépendant

Ce dépôt **ne fait pas partie de VaultWares**. Les protocoles VaultWares ne s'appliquent
pas ici :

- pas de sous-module `vaultwares-themes` — le projet a son propre système de design ;
- pas de chaînes bilingues — le site est en québécois (fr-CA) uniquement, parce que
  c'est la langue de la clientèle visée ;
- pas de projet Jira ni d'inscription à l'inventaire des services VaultWares.

## Démarrer

```bash
npm install
npm run dev
```

| Commande          | Ce qu'elle fait                                    |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Serveur de développement Vite                       |
| `npm run build`   | Jetons, TypeScript, puis production dans `dist/`     |
| `npm run preview` | Sert `dist/` localement                              |
| `npm run lint`    | Jetons et TypeScript, sans construire                |
| `npm run verifier`| Jetons seulement : concordance et contraste          |

## Structure

```
src/
  content/site.ts        Tout le texte du site, en un seul fichier
  styles/theme.css       Jetons du système de design (source de vérité)
  styles/index.css       Base, impression, accessibilité
  components/            Sections de la page
  components/ui/         Bouton, Section, Carte
outils/verifier-jetons.mjs  Garde-fou des jetons, lancé par `npm run build`
design-system/           Fiches poussées vers Claude Design
design-system/marque/    Dessins sources du logo, volontairement hors de public/
docs/brief-affiche.md    Brief à coller dans Claude Design pour l'affiche
```

## Coordonnées

Les vraies coordonnées sont en place depuis le 26 août 2026, en haut de
[`src/content/site.ts`](src/content/site.ts). Le même fichier alimente le site, les
données structurées et le brief de l'affiche : il n'y a pas de deuxième endroit où
les recopier.

Une seule paire est à tenir synchronisée à la main : `heures` (la phrase lue par les
gens) et `heuresMachine` (la même chose au format que Google lit). Changer l'une sans
l'autre passerait inaperçu à l'écran.

## Environnements et domaines

| Adresse                     | Rôle                             | Accès             |
| --------------------------- | -------------------------------- | ----------------- |
| `linformaticien.ca`         | Production, seul hôte canonique   | Public            |
| `www.linformaticien.ca`     | Redirection 301 vers l'apex       | Public            |
| `letechnicien.top`          | Redirection 301                   | Public            |
| `le.technicien.top`         | Redirection 301                   | Public            |
| `dev.linformaticien.ca`     | Préproduction                     | Tailnet seulement |

Chaque push sur `main` met à jour **dev** ; chaque push sur `prod` bascule la
**production** sur le même artéfact, sans le reconstruire. Voir
[`deploy/README.md`](deploy/README.md).

## Choix techniques

- **Vite + React 19 + TypeScript + Tailwind 4.** Site statique, aucune donnée serveur.
- **Aucune librairie de composants.** Les trois composants d'interface tiennent en
  une centaine de lignes ; une librairie ajouterait des styles à combattre. La seule
  dépendance d'interface est `lucide-react`, et seulement pour les pictogrammes : ce
  sont des SVG sans style imposé, et seuls les huit réellement importés se retrouvent
  dans le paquet.
- **`<details>` natif pour les questions fréquentes.** Accessible au clavier et lisible
  sans JavaScript.
- **Le cerne noir du logo comme motif.** Le mot-symbole est un aplat bleu cerné de
  noir ; boutons, cartes et pastilles reprennent ce cerne de 2 px. C'est ce qui
  accorde la page au dessin sans rien ajouter d'autre.
- **Deux dessins de logo, pas un.** Le mot-symbole fait exactement neuf fois plus
  large que haut : il porte l'en-tête à partir de 640 px (288 px de large, puis
  396 px à partir de 1280 px) et le pied de page. Sous 640 px il n'entre pas à côté
  du numéro de téléphone, et c'est la marque carrée qui sort. Le détail est dans
  [`design-system/logo.html`](design-system/logo.html).
- **Mesure d'audience par Google Tag Manager** (`GTM-5QJ5XN28`). C'est la
  **seule** requête vers un tiers de la page — tout le reste est servi par
  `linformaticien.ca`. Le conteneur est chargé en `async`, donc il ne retarde
  pas l'affichage.
- **Une seule police, auto-hébergée.** Aucune requête vers un tiers. Source Sans 3
  est variable : deux fichiers couvrent toutes les graisses, titres compris. Voir
  [`src/styles/fonts.css`](src/styles/fonts.css) — remplacer un fichier veut dire
  changer son nom, le vhost les met en cache pour un an.
- **Pas d'empattements.** Le mot-symbole est une grasse géométrique sans
  empattements ; les titres s'en approchent par la graisse (800) et le resserrement
  plutôt que par une deuxième famille. Abandonner Bitter a retiré 66 ko.

## Accessibilité

Le public cible a 65 ans et plus, mais l'ordre des priorités est explicite :

> une page qui a de l'allure **>** une page accessible **>** un score parfait aux
> outils automatiques.

Ce qui reste non négociable :

- corps de texte à 18 px minimum, interlignage 1,65 ;
- cibles cliquables d'au moins 48 px, 56 px pour l'action principale ;
- contour de focus de 3 px, visible ;
- liens de contenu soulignés, jamais distingués par la couleur seule. Le menu de
  l'en-tête fait exception : il est dans un `<nav>`, ses liens sont en gros et en
  bleu, et le soulignement arrive au survol avec un passage au rouge ;
- numéro de téléphone cliquable (`tel:`) et écrit en gros ;
- **3:1 de contraste, plancher dur.** En dessous, c'est illisible, pas stylé.

4,5:1 reste la **cible** pour le corps de texte (`encre`, `gris`) : c'est lui qu'on
lit longtemps. Les couleurs d'accent peuvent descendre entre 3 et 4,5 si le rendu y
gagne — le bleu du logo sur la teinte est à 4,0:1, et c'est assumé.

Le contraste se calcule sur les **deux** fonds du site, le blanc et la teinte. Les
ratios sont inscrits à côté de chaque jeton dans
[`src/styles/theme.css`](src/styles/theme.css) — les mesurer, jamais les estimer.

`npm run verifier` applique cette règle telle quelle : il **bloque** sous 3:1, il
**signale** en dessous de la cible sans bloquer, et il tourne dans `npm run build`.

## Système de design

Voir [`design-system/README.md`](design-system/README.md). Il est synchronisé avec le
projet **Linformaticien** sur [claude.ai/design](https://claude.ai/design), qui sert à
produire l'affiche imprimée.
