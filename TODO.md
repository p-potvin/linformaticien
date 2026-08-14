# À faire

Mise à jour : Fri, 14 Aug 2026 01:09

## Bloquant avant la mise en ligne

Ces décisions n'ont pas à être prises pour travailler sur dev : les valeurs
d'exemple y restent, et dev n'est ni public ni indexé. Elles bloquent la
**promotion en production**, pas le développement.

- [ ] Remplacer les valeurs `À REMPLIR` dans `src/content/site.ts` : nom, téléphone,
      courriel, zone desservie, heures d'appel. Tout le reste en dépend, y compris
      l'affiche et les données structurées.
- [ ] En même temps, ajuster `heuresMachine` pour qu'il dise la même chose que
      `heures`. C'est la seule paire du fichier à tenir synchronisée à la main ;
      c'est elle que Google lit.
- [ ] Décider des heures d'appel raisonnables et les écrire noir sur blanc. « Sur
      appel » sans plage horaire, ça finit par des appels à 23 h.
- [ ] Confirmer la zone desservie.
- [ ] Trancher la question du temps minimum facturé (une heure ? une demi-heure ?).
      Rien n'est écrit à ce sujet pour l'instant, volontairement.

Réglé : pas de supplément de déplacement. La question ne se pose pas.

## Affiche

- [ ] Coller `docs/brief-affiche.md` dans Claude Design, projet **Linformaticien**.
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
      `alert_floor: low`). Attention : sur dev, `expected_text` doit se contenter
      d'un mot présent dans la version d'exemple — les coordonnées y resteront
      fictives.
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
      (réglage courant chez les aînés). À surveiller en particulier : le bouton de
      téléphone de l'en-tête est en `whitespace-nowrap` et pourrait déborder à
      320 px avec une grosse police.
- [ ] Rediriger `letechnicien.top` et `le.technicien.top` vers `linformaticien.ca`.
- [ ] Valider le JSON-LD avec l'outil de test des résultats enrichis de Google —
      mais seulement une fois les vraies coordonnées en place, sinon on validerait
      un faux numéro.

## À décider plus tard

- [ ] Deuxième palier de services : sécurité en ligne, vie privée, gestion des mots de
      passe, installations domestiques complexes. Volontairement absents de la première
      version — venant d'un inconnu, ça peut inquiéter avant que la confiance soit
      établie.
- [ ] Page de témoignages, une fois qu'il y aura des clients à citer.
- [ ] Formulaire de rappel, si le téléphone seul ne suffit pas.
