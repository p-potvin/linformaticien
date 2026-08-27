# Brief pour l'affiche — à coller dans Claude Design

Mise à jour : Wed, 12 Aug 2026 08:32

## Comment s'en servir

Claude Design ne se pilote pas depuis Claude Code : il n'existe pas de canal pour lui
envoyer une consigne et récupérer une affiche. Le seul lien entre les deux, c'est le
projet de système de design, que Claude Code pousse et que Claude Design lit.

Marche à suivre :

1. Ouvrir [claude.ai/design](https://claude.ai/design).
2. Sélectionner le projet de système de design **Linformaticien**.
3. Coller le brief ci-dessous dans la conversation.
4. Remplacer les valeurs entre crochets par les vraies coordonnées avant de générer.

Le projet contient déjà les couleurs, la typographie, les composants, le vocabulaire
interdit et les contraintes d'impression. Il n'est donc pas nécessaire de les répéter
dans le brief — c'est justement à ça que sert la synchronisation.

---

## Le brief

> J'ai besoin d'une affiche pour offrir mes services de dépannage informatique.
> Utilise le système de design du projet (couleurs, typographie, composants, voix).
>
> **Format**
> 8,5 × 11 po, une seule face, orientation portrait, fond blanc uniquement. L'affiche
> sera imprimée, parfois photocopiée en noir et blanc : aucun aplat de couleur pleine
> page, la couleur sert seulement aux filets, aux puces et au prix. Marge de 1,3 cm sur
> les quatre côtés.
>
> **À qui ça s'adresse**
> Des personnes âgées qui ne sont pas à l'aise avec l'informatique et qui ne connaissent
> pas notre jargon. Elle sera affichée dans des résidences pour aînés, des CHSLD et des
> halls de blocs à condos. Ce n'est pas pour des entreprises et ce n'est pas pour des
> jeunes.
>
> **Langue**
> Québécois courant (fr-CA) uniquement. Aucun mot d'anglais, aucun terme technique,
> aucune abréviation. Vouvoiement. Des phrases courtes. Respecte la fiche « Voix et
> vocabulaire » du système de design. Aucun ton alarmiste ni d'urgence : ces
> personnes-là reçoivent déjà assez d'appels frauduleux.
>
> **Ce qui doit apparaître, dans cet ordre de lecture**
>
> 1. Le nom : **L'Informaticien** — dépannage informatique à domicile. Le nom a
>    maintenant un dessin : utilise le mot-symbole du système de design (fiche
>    « Logo ») plutôt que de le composer en caractères. Il est fait pour être
>    lu de loin, et il fait neuf fois plus large que haut : donne-lui sa propre
>    ligne, pleine largeur du bloc, en haut de l'affiche.
> 2. Une accroche courte, chaleureuse, 40 à 56 pt. Proposition : « On règle ça ensemble,
>    chez vous. »
> 3. Ce que je fais, 4 à 6 points, chacun commençant par un verbe :
>    - Réparer vos appareils : ordinateurs, ordinateurs portables, Mac, cellulaires,
>      tablettes, télévisions, imprimantes.
>    - Vous conseiller avant d'acheter, pour ne pas payer pour rien.
>    - Vous montrer à vous servir de vos appareils, à votre rythme, aussi souvent qu'il
>      le faut.
>    - Brancher et mettre de l'ordre : nouvel appareil, imprimante, internet sans fil.
>    - Démêler vos forfaits de téléphone, d'internet et de câble.
>    - Remettre de l'ordre dans vos comptes et vos mots de passe.
> 4. Le prix : **30 $ de l'heure**. Bien visible, sans astérisque, sans petits
>    caractères.
> 5. La disponibilité : **sur appel ou sur rendez-vous**. Mets l'accent sur « sur
>    appel » : les gens doivent comprendre qu'ils peuvent téléphoner quand ça leur
>    adonne, entre [HEURES]. Je m'arrange ensuite avec chacun pour l'horaire.
> 6. Une ligne qui rassure : je me déplace chez vous, vous n'avez rien à transporter.
> 7. Le téléphone : **[TÉLÉPHONE]**, en 36 pt minimum. C'est le dernier élément lu et
>    le deuxième plus gros de l'affiche après l'accroche.
> 8. En plus petit : [COURRIEL], linformaticien.ca, et la zone desservie : [ZONE].
>
> **Ce qu'il ne faut pas**
> Pas de photo de banque d'images, pas de dégradé, pas de texte sur image, pas de texte
> en biais, pas de gris pâle sur blanc, pas de capitales sur plus de trois mots, pas de
> code QR à la place du numéro écrit. Rien sous 12 pt.
>
> **Ce que je veux qu'on ressente**
> Quelqu'un du quartier, patient, honnête, qui ne fera sentir personne dépassé. Pas une
> compagnie : une seule personne. C'est pour ça que tout est écrit au « je ».

---

## Valeurs à remplacer avant de générer

| Marqueur      | Où le trouver                                             |
| ------------- | --------------------------------------------------------- |
| `[TÉLÉPHONE]` | `src/content/site.ts` → `coordonnees.telephone`             |
| `[COURRIEL]`  | `src/content/site.ts` → `coordonnees.courriel`              |
| `[ZONE]`      | `src/content/site.ts` → `coordonnees.zone`                  |
| `[HEURES]`    | `src/content/site.ts` → `coordonnees.heures`                |

Les mêmes valeurs alimentent le site : les changer à un seul endroit garde l'affiche
et le site d'accord.

## Deuxième version à prévoir

Une fois l'affiche lettre approuvée, demander la déclinaison **carte d'affaires
3,5 × 2 po** : nom, promesse en quatre mots, téléphone, courriel, site, prix. Mêmes
jetons, même fond blanc.
