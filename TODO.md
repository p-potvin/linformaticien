# À faire

Mise à jour : Wed, 12 Aug 2026 08:32

## Bloquant avant la mise en ligne

- [ ] Remplacer les valeurs `À REMPLIR` dans `src/content/site.ts` : nom, téléphone,
      courriel, zone desservie, heures d'appel. Tout le reste en dépend, y compris
      l'affiche.
- [ ] Décider des heures d'appel raisonnables et les écrire noir sur blanc. « Sur
      appel » sans plage horaire, ça finit par des appels à 23 h.
- [ ] Confirmer la zone desservie et si le déplacement est facturé au-delà.
- [ ] Trancher la question du temps minimum facturé (une heure ? une demi-heure ?).
      Rien n'est écrit à ce sujet pour l'instant, volontairement.

## Affiche

- [ ] Coller `docs/brief-affiche.md` dans Claude Design, projet **Linformaticien**.
- [ ] Imprimer un essai et le lire à bout de bras, sans lunettes.
- [ ] Le photocopier en noir et blanc pour vérifier que rien ne se perd.
- [ ] Faire relire le texte par une personne de la clientèle visée avant l'impression
      en quantité. C'est le seul test qui compte vraiment.
- [ ] Décliner en carte d'affaires 3,5 × 2 po.

## Site

- [ ] Auto-héberger Bitter et Source Sans 3 plutôt que de dépendre de Google Fonts.
- [ ] Ajouter `sitemap.xml` (`robots.txt` le référence déjà).
- [ ] Ajouter les données structurées `LocalBusiness` en JSON-LD : c'est ce qui fait
      apparaître le numéro de téléphone directement dans Google.
- [ ] Vérifier le rendu réel sur un téléphone, à taille de police système agrandie
      (réglage courant chez les aînés).
- [ ] Passer un vérificateur d'accessibilité automatisé, puis une navigation complète
      au clavier seul.
- [ ] Rediriger `letechnicien.top` et `le.technicien.top` vers `linformaticien.ca`.

## À décider plus tard

- [ ] Deuxième palier de services : sécurité en ligne, vie privée, gestion des mots de
      passe, installations domestiques complexes. Volontairement absents de la première
      version — venant d'un inconnu, ça peut inquiéter avant que la confiance soit
      établie.
- [ ] Page de témoignages, une fois qu'il y aura des clients à citer.
- [ ] Formulaire de rappel, si le téléphone seul ne suffit pas.
