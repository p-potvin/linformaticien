# Déploiement

Mise à jour : Thu, 27 Aug 2026 01:20

## Le modèle : construire une fois, promouvoir l'artéfact

```
push sur main                          push sur prod
  └─ webhook signé                       └─ webhook signé
      └─ vw-webhookd                         └─ vw-webhookd
          └─ deploy-linformaticien.sh            └─ deploy-linformaticien.sh
              VW_REF=refs/heads/main                 VW_REF=refs/heads/prod
              ├─ git checkout du SHA                 └─ bascule prod → le MÊME
              ├─ npm ci && npm run build                releases/<SHA>, SANS
              ├─ publie releases/<SHA>                  reconstruire
              └─ bascule dev → releases/<SHA>
                  └─ dev  (tailnet)                        └─ linformaticien.ca
```

Une seule commande sert les deux : c'est `VW_REF` qui les distingue.

**Aucune reconstruction entre dev et prod.** `prod` étant une avance rapide de
`main`, l'artéfact existe déjà quand elle est poussée ; le script se contente de
basculer le lien. Ce qui part en production est donc l'artéfact exact qui a été
regardé sur dev, octet pour octet.

Si l'artéfact manque — release élaguée, ou `prod` poussée sans passer par
`main` — le script construit quand même, mais il l'écrit en toutes lettres dans
le journal : la production ne sert alors pas un artéfact déjà vu.

### Mettre en production

```bash
git checkout prod && git merge --ff-only main && git push
```

Pas de fusion à trois branches, pas de commit de fusion : `--ff-only` garantit
que `prod` ne peut être qu'un point de `main` déjà passé par dev.

Les deux poussées arrivent à quelques secondes d'intervalle et se disputent le
verrou de déploiement. C'est prévu : le verrou **attend** son tour au lieu
d'abandonner, donc la production part dès que la construction de dev est finie.
Compter environ deux minutes pour l'ensemble.

### Le correctif du répartiteur

`/opt/vaultwares-adk/webhookd/vw_webhookd.py` indexe ses cibles par
`owner/repo` et n'en retenait **qu'une seule branche** :

```python
expected_branch = target.get("branch") or "main"
expected_ref = f"refs/heads/{expected_branch}"
if ref != expected_ref:
    ...ignored
```

Le 27 août 2026, ce test accepte désormais aussi une **liste** de branches. Le
correctif est rétrocompatible : les treize autres cibles utilisent une chaîne et
se comportent exactement comme avant.

```python
expected_branch = target.get("branch") or "main"
if isinstance(expected_branch, str):
    expected_branch = [expected_branch]
expected_refs = {f"refs/heads/{b}" for b in expected_branch}
if ref not in expected_refs:
    ...ignored
```

**C'est un fichier partagé par tous les projets, et la documentation VaultWares
le signale comme régulièrement réécrit.** S'il est réécrit sans ce correctif, la
cible de ce dépôt aura une liste dans `branch`, ne correspondra plus à aucune
poussée, et **les deux environnements cesseront silencieusement de se
déployer** — aucune erreur, aucune alerte, juste plus rien.

Symptôme à reconnaître dans `/var/log/vw-webhookd.log` :
`ignored ... reason=ref=refs/heads/main`. Sauvegarde du fichier d'origine :
`/opt/vaultwares-adk/webhookd/vw_webhookd.py.bak-20260827-multibranch`.

En attendant le rétablissement, `promote-linformaticien.sh` fonctionne toujours
et ne dépend pas du répartiteur.

## Rôle de chaque environnement

| | dev | production |
| --- | --- | --- |
| Adresse | `dev.linformaticien.ca` | `linformaticien.ca` |
| Accès | tailnet seulement (`allow 100.64.0.0/10`) | public |
| Mise à jour | chaque push sur `main` | chaque push sur `prod` |
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

La mise en production passe par la branche `prod` (voir plus haut).
`promote-linformaticien.sh` reste installé et sert à ce que la branche ne fait
pas : constater l'état, revenir en arrière, forcer une version précise. Il ne
dépend pas du répartiteur, donc il fonctionne même si le correctif est perdu.

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
| Plus rien ne se déploie, journal en `reason=ref=refs/heads/main` | `vw_webhookd.py` réécrit, correctif multi-branches perdu | Le réappliquer (voir « Le correctif du répartiteur »), ou repasser `branch` à `main` seul et promouvoir à la main |
| `deploy already running`, la production ne bouge pas | Deux poussées rapprochées, `main` puis `prod` — c'est la manœuvre normale | Réglé : le verrou **attend** jusqu'à 15 minutes au lieu d'abandonner. Si le message revient, un déploiement est vraiment bloqué |

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

Il reste à enregistrer `dev.linformaticien.ca` dans `services.yaml`. Viser le nom
de la marque pour `expected_text`, pas le numéro de téléphone : le nom ne changera
plus, le numéro peut changer, et une sonde qui tombe en panne le jour où on corrige
une coordonnée est une sonde qui crie pour rien.

(Une note précédente disait que dev garderait des valeurs d'exemple en permanence.
C'est faux depuis le 26 août 2026 : les vraies coordonnées sont dans le dépôt, donc
dev les affiche aussi.)

Modifier la surveillance passe par un push sur `main` de `health-ledger` : le
déploiement redémarre les services Joker sur greencloud et OVH. Plus rien à
configurer à la main sur les machines.

## Reste à faire (hors dépôt)

- [ ] Déclarer le service dans `vault-monitor`.
- [ ] Ajouter les deux URL à `vaultwares-docs` → `operations/services-inventory`
      (règle : le jour même où une URL publique apparaît).
