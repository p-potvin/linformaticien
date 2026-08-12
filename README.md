# L'Informaticien

Site vitrine pour un service de dépannage informatique à domicile, destiné à une
clientèle âgée peu à l'aise avec la technologie.

Dernière mise à jour : Wed, 12 Aug 2026 08:32

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
| `npm run build`   | Vérification TypeScript puis production dans `dist/` |
| `npm run preview` | Sert `dist/` localement                              |
| `npm run lint`    | Vérification TypeScript seule                        |

## Structure

```
src/
  content/site.ts        Tout le texte du site, en un seul fichier
  styles/theme.css       Jetons du système de design (source de vérité)
  styles/index.css       Base, impression, accessibilité
  components/            Sections de la page
  components/ui/         Bouton, Section, Carte
design-system/           Fiches poussées vers Claude Design
docs/brief-affiche.md    Brief à coller dans Claude Design pour l'affiche
```

## Avant la mise en ligne

Les coordonnées sont des **valeurs d'exemple**. Remplacer les entrées marquées
`À REMPLIR` en haut de [`src/content/site.ts`](src/content/site.ts) : nom, téléphone,
courriel, zone desservie et heures d'appel. Le même fichier alimente le site et le
brief de l'affiche.

## Environnements et domaines

| Adresse                     | Rôle                             | Accès             |
| --------------------------- | -------------------------------- | ----------------- |
| `linformaticien.ca`         | Production, seul hôte canonique   | Public            |
| `www.linformaticien.ca`     | Redirection 301 vers l'apex       | Public            |
| `letechnicien.top`          | Redirection 301                   | Public            |
| `le.technicien.top`         | Redirection 301                   | Public            |
| `dev.linformaticien.ca`     | Préproduction                     | Tailnet seulement |

Chaque push sur `main` déclenche un webhook signé et met à jour **dev**.
La production est une promotion explicite du même artéfact, jamais une
reconstruction. Voir [`deploy/README.md`](deploy/README.md).

## Choix techniques

- **Vite + React 19 + TypeScript + Tailwind 4.** Site statique, aucune donnée serveur.
- **Aucune dépendance d'interface externe.** Les trois composants d'interface tiennent
  en une centaine de lignes ; une librairie ajouterait des styles à combattre.
- **`<details>` natif pour les questions fréquentes.** Accessible au clavier et lisible
  sans JavaScript.
- **Polices Google en lien externe.** À auto-héberger avant la mise en ligne (voir
  `TODO.md`).

## Accessibilité

Le public cible a 65 ans et plus. Les règles ne sont pas négociables :

- corps de texte à 18 px minimum, interlignage 1,65 ;
- contraste d'au moins 4,5:1 pour tout texte, calculé sur fond blanc ;
- cibles cliquables d'au moins 48 px, 56 px pour l'action principale ;
- contour de focus de 3 px, visible ;
- liens soulignés, jamais distingués par la couleur seule ;
- numéro de téléphone cliquable (`tel:`) et écrit en gros.

## Système de design

Voir [`design-system/README.md`](design-system/README.md). Il est synchronisé avec le
projet **Linformaticien** sur [claude.ai/design](https://claude.ai/design), qui sert à
produire l'affiche imprimée.
