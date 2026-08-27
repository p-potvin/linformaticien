# À faire

Mise à jour : Thu, 27 Aug 2026 09:30

## Bloquant avant la mise en ligne

- [x] Vraies coordonnées dans `src/content/site.ts` : Philippe Potvin,
      (438) 827-4585, philippe.potvin@linformaticien.ca, Sorel-Tracy.
- [x] Heures d'appel arrêtées : de 8 h à 20 h en semaine, de 10 h à 16 h la fin de
      semaine. `heuresMachine` dit la même chose
      (`Mo-Fr 08:00-20:00` et `Sa-Su 10:00-16:00`).
- [x] Zone desservie confirmée : Sorel-Tracy.
- [x] Temps minimum facturé : il n'y en a pas, c'est le tarif horaire qui
      s'applique. Rien à ajouter sur le site — « Le temps est calculé au cas par
      cas » dit déjà ce qu'il faut.

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

- [x] **Mise en ligne faite le 27 août 2026.** La sonde de `health-ledger` exige
      maintenant `200` et le texte « L'Informaticien » (PR health-ledger #6).
      Limite connue et écrite dans les notes de l'entrée : la sonde n'exécute pas
      de JavaScript, donc elle vérifie que le bon `index.html` est servi, pas que
      la page s'affiche. Un paquet JS cassé passerait encore.
- [x] Route split-DNS Tailscale. Elle vise `dev.linformaticien.ca` seulement, et
      non l'apex : la production doit continuer de se résoudre par le DNS public,
      y compris depuis le tailnet, sans quoi on surveillerait un chemin que
      personne d'autre n'emprunte.
- [x] `dev.linformaticien.ca` enregistré dans `services.yaml` après confirmation
      d'un 200 (PR health-ledger #7). `alert_floor: low` — dev se met à jour à
      chaque poussée sur `main`, c'est la surface la plus bruyante des deux.
- [x] Les deux URL inscrites à `vaultwares-docs` → `operations/services-inventory`,
      versions EN et QC (PR vaultwares-docs #29).

## Site

- [x] Auto-héberger la police plutôt que de dépendre de Google Fonts. (Bitter a
      depuis été retiré : une seule famille, Source Sans 3.)
- [x] Ajouter `sitemap.xml` (`robots.txt` le référence déjà).
- [x] Ajouter les données structurées `LocalBusiness` en JSON-LD.
- [x] Passer un vérificateur d'accessibilité automatisé : axe-core sur le DOM
      rendu, aucune violation. Les correctifs sont détaillés dans `CHANGES.md`.
- [ ] Navigation complète au clavier seul, dans un vrai navigateur. L'ordre de
      tabulation a été vérifié dans le DOM (19 éléments, aucun `tabindex` positif),
      mais personne n'a encore *vu* le contour de focus se promener dans la page.
- [ ] Vérifier le rendu réel sur un téléphone, à taille de police système agrandie
      (réglage courant chez les aînés). L'en-tête porte maintenant le mot-symbole
      dès 320 px, avec 36 px de marge — c'est le passage le plus serré du site, et
      il n'a jamais été vu autrement que par le calcul.
- [ ] Regarder le mot-symbole de l'en-tête sur un vrai écran large. Les largeurs
      (288 px, puis 396 px à partir de 1280 px) viennent d'un calcul sur les
      métriques réelles des polices, pas d'une observation.
- [x] Fond teinté plus visible : `#dbe9f5`, soit deux fois l'écart avec le blanc
      qu'avait `#f2f7fb`.
- [x] Bande bleue de la section « Pour qui » regardée en vrai : le texte blanc
      manquait de détachement. Passée au bleu foncé (7,98:1) avec des pastilles
      rondes derrière les crochets.
- [ ] Vérifier que le menu à 24 px ne manque pas trop entre 1024 et 1279 px. S'il
      manque, deux sorties : redescendre les liens à 20 px (ils tiennent alors
      dès 1024 px), ou accepter que le menu soit réservé aux grands écrans.
- [ ] À l'impression, la bande « Pour qui » sort en blanc avec du texte noir.
      Prévu, jamais vu sur papier.
- [ ] **En attente (décision du 27 août 2026)** : rediriger `letechnicien.top` et
      `le.technicien.top` vers `linformaticien.ca`. Les vhosts sont écrits, mais
      les certificats de ces domaines n'ont pas été demandés — la commande
      `certbot` de `deploy/README.md` les inclut, il faudra la relancer.
- [ ] Valider le JSON-LD avec l'outil de test des résultats enrichis de Google.
      Les vraies coordonnées y sont maintenant, donc ce test a du sens. À faire une
      fois le site en ligne : l'outil doit pouvoir atteindre l'adresse publique.
- [ ] Regarder l'aperçu de partage dans Messenger et Facebook une fois en ligne
      (`og-image.png`, 1200 × 630). Les deux gardent l'ancienne image en cache
      longtemps : vérifier tôt.

## Mesure d'audience

- [x] **Décision : pas de mesure d'audience.** Le conteneur GTM a été posé le
      27 août puis retiré le jour même. Google n'impose rien au Canada, mais la
      Loi 25 exige le consentement préalable dès qu'une balise dépose des témoins
      de profilage, et une bannière coûte plus à ce public qu'un tableau de bord
      ne rapporte.
- [ ] Si le besoin de chiffres revient : les journaux nginx comptent déjà les
      visites sans aucun témoin (`/var/log/nginx/linformaticien.access.log`).
      Un GoAccess ou équivalent lit ça directement, sans consentement à demander,
      parce que rien n'est déposé chez le visiteur.

## À décider plus tard

- [ ] Deuxième palier de services : sécurité en ligne, vie privée, gestion des mots de
      passe, installations domestiques complexes. Volontairement absents de la première
      version — venant d'un inconnu, ça peut inquiéter avant que la confiance soit
      établie.
- [ ] Page de témoignages, une fois qu'il y aura des clients à citer.
- [ ] Formulaire de rappel, si le téléphone seul ne suffit pas.
