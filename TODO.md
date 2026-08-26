# À faire

Mise à jour : Wed, 26 Aug 2026 17:42

## Bloquant avant la mise en ligne

- [x] Vraies coordonnées dans `src/content/site.ts` : Philippe Potvin,
      438 827-4585, philippe.potvin@linformaticien.ca, Sorel-Tracy.
- [x] Heures d'appel arrêtées : de 8 h à 20 h, du lundi au vendredi. `heuresMachine`
      dit la même chose (`Mo-Fr 08:00-20:00`).
- [x] Zone desservie confirmée : Sorel-Tracy.
- [ ] Trancher la question du temps minimum facturé (une heure ? une demi-heure ?).
      Rien n'est écrit à ce sujet pour l'instant, volontairement. **Seul point
      encore ouvert avant la mise en ligne.**

Réglé : pas de supplément de déplacement. La question ne se pose pas.

Attention : le site publié affiche désormais un vrai numéro et une vraie adresse
courriel. Dev n'est pas indexé et reste sur le tailnet, mais ce ne sont plus des
valeurs jetables.

## Affiche

- [ ] Coller `docs/brief-affiche.md` dans Claude Design, projet **Linformaticien**.
- [ ] Y placer le mot-symbole (`design-system/marque/logo.png`), en haut. Le brief
      a été écrit avant que le logo existe : il demandait d'écrire le nom en
      caractères. Maintenant qu'il y a un dessin, c'est lui qui porte le nom.
- [ ] Imprimer un essai et le lire à bout de bras, sans lunettes.
- [ ] Le photocopier en noir et blanc pour vérifier que rien ne se perd.
- [ ] Faire relire le texte par une personne de la clientèle visée avant l'impression
      en quantité. C'est le seul test qui compte vraiment.
- [ ] Décliner en carte d'affaires 3,5 × 2 po.

## Mise en production et surveillance

- [ ] **Le jour de la mise en ligne**, dans `health-ledger/services.yaml`, entrée
      `linformaticien` : retirer `404` de `expected_status_any_of` et ajouter
      `expected_text: "L'Informaticien"`. Sans ça, un site vide passerait pour
      un site en santé indéfiniment.
- [x] Route split-DNS Tailscale. Elle vise `dev.linformaticien.ca` seulement, et
      non l'apex : la production doit continuer de se résoudre par le DNS public,
      y compris depuis le tailnet, sans quoi on surveillerait un chemin que
      personne d'autre n'emprunte.
- [ ] Vérifier `curl https://dev.linformaticien.ca/` depuis Clopeux, puis
      enregistrer `linformaticien-dev` dans `services.yaml` (200, `expected_text`,
      `alert_floor: low`). Viser le nom de la marque pour `expected_text`, pas le
      numéro : le nom ne changera plus, le numéro peut changer.
- [ ] Ajouter les deux URL à `vaultwares-docs` →
      `operations/services-inventory` (règle : le jour même où une URL publique
      apparaît).

## Site

- [x] Auto-héberger Bitter et Source Sans 3 plutôt que de dépendre de Google Fonts.
- [x] Ajouter `sitemap.xml` (`robots.txt` le référence déjà).
- [x] Ajouter les données structurées `LocalBusiness` en JSON-LD.
- [x] Passer un vérificateur d'accessibilité automatisé : axe-core sur le DOM
      rendu, aucune violation. Les correctifs sont détaillés dans `CHANGES.md`.
- [ ] Navigation complète au clavier seul, dans un vrai navigateur. L'ordre de
      tabulation a été vérifié dans le DOM (19 éléments, aucun `tabindex` positif),
      mais personne n'a encore *vu* le contour de focus se promener dans la page.
- [ ] Vérifier le rendu réel sur un téléphone, à taille de police système agrandie
      (réglage courant chez les aînés). Le débordement de l'en-tête est réglé — la
      marque carrée a remplacé le mot-symbole, ce qui laisse 42 px de marge à
      320 px. Ce qui reste à surveiller : le bouton est en `whitespace-nowrap`, donc
      une police système très agrandie peut encore le pousser dehors.
- [ ] Rediriger `letechnicien.top` et `le.technicien.top` vers `linformaticien.ca`.
- [ ] Valider le JSON-LD avec l'outil de test des résultats enrichis de Google.
      Les vraies coordonnées y sont maintenant, donc ce test a du sens. À faire une
      fois le site en ligne : l'outil doit pouvoir atteindre l'adresse publique.
- [ ] Regarder l'aperçu de partage dans Messenger et Facebook une fois en ligne
      (`og-image.png`, 1200 × 630). Les deux gardent l'ancienne image en cache
      longtemps : vérifier tôt.

## À décider plus tard

- [ ] Deuxième palier de services : sécurité en ligne, vie privée, gestion des mots de
      passe, installations domestiques complexes. Volontairement absents de la première
      version — venant d'un inconnu, ça peut inquiéter avant que la confiance soit
      établie.
- [ ] Page de témoignages, une fois qu'il y aura des clients à citer.
- [ ] Formulaire de rappel, si le téléphone seul ne suffit pas.
