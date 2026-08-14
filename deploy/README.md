# Déploiement

Mise à jour : Fri, 14 Aug 2026 01:09

## Le modèle : construire une fois, promouvoir l'artéfact

```
push sur main
  └─ GitHub envoie un webhook signé
      └─ hooks.vaultwares.ca/github  (nginx, greencloud)
          └─ vw-webhookd vérifie la signature        127.0.0.1:9033
              └─ deploy-linformaticien.sh            (utilisateur vwdeploy)
                  ├─ git fetch + checkout du SHA
                  ├─ npm ci && npm run build
                  ├─ publie dans releases/<SHA>
                  └─ bascule le lien dev → releases/<SHA>
                      └─ dev.linformaticien.ca  (tailnet seulement)

promotion manuelle
  └─ promote-linformaticien.sh
      └─ bascule le lien prod → le MÊME releases/<SHA>
          └─ linformaticien.ca  (public)
```

Aucune reconstruction entre dev et prod. Ce qui part en production est
l'artéfact exact qui a été regardé sur dev, octet pour octet.

### Pourquoi pas une branche `dev` et une branche `main`

Le répartiteur ne le permet pas. Dans
`/opt/vaultwares-adk/webhookd/vw_webhookd.py`, les cibles sont indexées par
`owner/repo` et ne retiennent qu'une seule branche :

```python
expected_branch = target.get("branch") or "main"
expected_ref = f"refs/heads/{expected_branch}"
if ref != expected_ref:
    ...ignored
```

Un dépôt ne peut donc pas router `dev` et `main` vers deux commandes
différentes sans modifier ce fichier — un fichier partagé par tous les projets,
et que la documentation signale comme régulièrement réécrit.

La promotion d'artéfact évite ce problème et vaut mieux de toute façon : une
branche `dev` reconstruit la production séparément, ce qui laisse la porte
ouverte à ce que prod diffère de ce qui a été validé.

## Rôle de chaque environnement

| | dev | production |
| --- | --- | --- |
| Adresse | `dev.linformaticien.ca` | `linformaticien.ca` |
| Accès | tailnet seulement (`allow 100.64.0.0/10`) | public |
| Mise à jour | chaque push sur `main` | commande explicite |
| Indexation | `X-Robots-Tag: noindex` | indexé |
| Racine | `/var/www/linformaticien/dev` | `/var/www/linformaticien/prod` |

Les deux liens pointent dans `/var/www/linformaticien/releases/<SHA>/`.

## Installation (à faire une fois, sur greencloud, en root)

```bash
# 1. Arborescence
install -d -o vwdeploy -g vwdeploy /var/www/linformaticien/releases
install -d -o vwdeploy -g vwdeploy /var/www/linformaticien-src
install -d -o vwdeploy -g vwdeploy /var/lib/vw-deploy

# 2. Scripts de déploiement
install -o root -g vwdeploy -m 0750 deploy/deploy-linformaticien.sh  /var/www/deploy-scripts/
install -o root -g vwdeploy -m 0750 deploy/promote-linformaticien.sh /var/www/deploy-scripts/

# 3. Certificats (le DNS public pointe déjà vers 173.249.194.15)
certbot certonly --webroot -w /var/www/html \
  -d linformaticien.ca -d www.linformaticien.ca \
  -d letechnicien.top -d www.letechnicien.top \
  -d le.technicien.top
certbot certonly --webroot -w /var/www/html -d dev.linformaticien.ca

# 4. Vhosts
install -m 0644 deploy/nginx/linformaticien.ca.conf     /etc/nginx/sites-available/
install -m 0644 deploy/nginx/dev.linformaticien.ca.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/linformaticien.ca.conf     /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/dev.linformaticien.ca.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 5. Résolution tailnet pour dev
echo 'host-record=dev.linformaticien.ca,100.73.93.84' >> /etc/dnsmasq.d/vaultwares-tailnet.conf
systemctl restart dnsmasq

# 6. Cible du webhook — ajouter le bloc de deploy/webhookd-target.yml
#    sous `targets:` dans /etc/vw-webhookd/config.yml, puis :
systemctl restart vw-webhookd
systemctl is-active vw-webhookd
```

Le fichier `/etc/vw-webhookd/config.yml` doit rester **sans CRLF**. S'il est
édité depuis Windows : `sed -i 's/\r//g' /etc/vw-webhookd/config.yml`.

### Côté GitHub

Ajouter un webhook sur `p-potvin/linformaticien` :

- URL : `https://hooks.vaultwares.ca/github`
- Type de contenu : `application/json`
- Secret : `VW_GITHUB_WEBHOOK_SECRET` (VaultWarden, `warden.vaultwares.ca`)
- Événements : `push` (plus `pull_request` si la synchro Jira est souhaitée)

Aucun workflow GitHub Actions de déploiement. Des vérifications sur les PR sont
permises, jamais un déploiement.

## Usage courant

```bash
# Voir ce que chaque environnement sert
/var/www/deploy-scripts/promote-linformaticien.sh --status

# Mettre en production ce qui est actuellement sur dev
/var/www/deploy-scripts/promote-linformaticien.sh

# Mettre en production une version précise
/var/www/deploy-scripts/promote-linformaticien.sh 3f2a9c1

# Revenir à la version précédente
/var/www/deploy-scripts/promote-linformaticien.sh --rollback
```

Le retour arrière est une bascule de lien symbolique : il prend une seconde et
ne reconstruit rien.

## Vérifier qu'un déploiement est passé

```bash
ssh root@100.73.93.84 'tail -20 /var/log/vw-webhookd.log'
```

Attendu, dans l'ordre : `push: repo=p-potvin/linformaticien`, puis
`run: /var/www/deploy-scripts/deploy-linformaticien.sh`, puis `exit=0`.

Une ligne `vw_jira_sync_nonblocking_failure` entre les deux est normale et ne
bloque pas le déploiement.

La version en ligne se lit dans le source de la page, en commentaire HTML
(`<!-- vX.Y.Z -->`, deuxième ligne), jamais dans la console du navigateur.

## Pannes déjà rencontrées ailleurs

| Symptôme | Cause | Correctif |
| --- | --- | --- |
| Livraison GitHub en `401` | Secret du webhook différent des deux côtés | Réaligner sur `VW_GITHUB_WEBHOOK_SECRET` |
| `deny: bad_signature` dans le journal | CRLF dans `/etc/vw-webhookd/env` | `sed -i 's/\r//g' /etc/vw-webhookd/env` |
| `not our ref` sur un fetch | Un `git fetch origin <SHA>` traîne dans le script | Le retirer ; `--all --prune` ramène déjà `origin/main` |
| `Permission denied` sur le verrou | Verrou laissé à `root:root` | Le verrou vit dans `/var/lib/vw-deploy/`, mode 0666 |
| Le déploiement passe mais la page ne change pas | `index.html` mis en cache | Le vhost envoie déjà `Cache-Control: no-cache` sur `index.html` |

## Surveillance

`linformaticien.ca` et le domaine de redirection sont enregistrés dans
`health-ledger/services.yaml` (route de projet `production`, plancher d'alerte
`medium`), sondés depuis `clopeux-desktop` et `vps-ovhcloud`. Greencloud est
exclu de ses propres sondes : un hôte qui prouve qu'il se voit lui-même ne
prouve rien.

La sonde de production accepte `200` **ou** `404` tant que la production n'a pas
été promue. À corriger le jour de la mise en ligne — voir `TODO.md`.

La route split-DNS Tailscale est en place, et elle vise **`dev.linformaticien.ca`
seulement**, pas l'apex. C'est voulu : la production doit se résoudre par le DNS
public depuis partout, tailnet compris. Une sonde qui emprunterait un chemin
réservé aux membres du tailnet ne prouverait rien sur ce que voit le public.

Il reste à enregistrer `dev.linformaticien.ca` dans `services.yaml`. Son
`expected_text` ne peut pas porter sur les coordonnées : dev garde en permanence
les valeurs d'exemple, par choix. Viser le nom de la marque.

Modifier la surveillance passe par un push sur `main` de `health-ledger` : le
déploiement redémarre les services Joker sur greencloud et OVH. Plus rien à
configurer à la main sur les machines.

## Reste à faire (hors dépôt)

- [ ] Déclarer le service dans `vault-monitor`.
- [ ] Ajouter les deux URL à `vaultwares-docs` → `operations/services-inventory`
      (règle : le jour même où une URL publique apparaît).
