#!/usr/bin/env bash
# Deploy L'Informaticien — runs on greencloud-vps as `vwdeploy`.
# Installed at: /var/www/deploy-scripts/deploy-linformaticien.sh
# Triggered by: vw-webhookd on a signed GitHub push to `main` OR to `prod`.
#
# Le même script sert les deux environnements, et c'est VW_REF qui les
# distingue :
#
#   refs/heads/main  ->  construit, publie dans releases/<SHA>, bascule DEV
#   refs/heads/prod  ->  bascule PROD sur releases/<SHA>, SANS reconstruire
#
# La branche `prod` étant une avance rapide de `main`, l'artéfact existe déjà
# quand elle est poussée : la production sert alors exactement les octets qui
# ont été regardés sur dev. Si le release manque (release élaguée, ou `prod`
# poussée sans passer par `main`), le script construit — et le dit.
#
# La promotion manuelle reste disponible et sert au retour arrière :
#   /var/www/deploy-scripts/promote-linformaticien.sh --rollback
#
# Mise à jour : Thu, 27 Aug 2026 01:20

set -euo pipefail

REPO_URL="https://github.com/p-potvin/linformaticien.git"
CHECKOUT_DIR="/var/www/linformaticien-src"
ROOT_DIR="/var/www/linformaticien"
RELEASES_DIR="${ROOT_DIR}/releases"
KEEP_RELEASES=5

# Lock lives in /var/lib/vw-deploy, NOT /var/lock. Ubuntu 24.04 sets
# fs.protected_regular=2, which stops root from O_CREAT-opening a regular file
# it does not own inside the world-writable sticky /run/lock. See
# operations/deployment-flow "Deploy script invariants".
LOCK_DIR="/var/lib/vw-deploy"
LOCK_FILE="${LOCK_DIR}/linformaticien.lock"

mkdir -p "$LOCK_DIR"
touch "$LOCK_FILE"
chmod 0666 "$LOCK_FILE" 2>/dev/null || true

exec 9>"$LOCK_FILE"
flock -n 9 || { echo "deploy already running"; exit 1; }

SHA="${VW_AFTER:-}"
if [[ -z "$SHA" ]]; then
  echo "VW_AFTER missing"
  exit 1
fi

# Quel environnement ? `main` va sur dev, `prod` va en production.
REF="${VW_REF:-refs/heads/main}"
case "$REF" in
  refs/heads/main) CIBLE="dev" ;;
  refs/heads/prod) CIBLE="prod" ;;
  *)
    echo "ref inattendue: ${REF} — rien à faire"
    exit 0
    ;;
esac

echo "=== deploy linformaticien ${SHA} -> ${CIBLE} at $(date -Is) ==="

mkdir -p "$CHECKOUT_DIR" "$RELEASES_DIR"

export GIT_TERMINAL_PROMPT=0
export GIT_ASKPASS="/var/www/deploy-scripts/git-askpass-vw-gh-token.sh"

if [[ ! -d "${CHECKOUT_DIR}/.git" ]]; then
  find "$CHECKOUT_DIR" -mindepth 1 -delete
  git clone "$REPO_URL" "$CHECKOUT_DIR"
fi

RELEASE_DIR="${RELEASES_DIR}/${SHA}"

# Sur `prod`, l'artéfact a normalement déjà été construit par la poussée sur
# `main` : on ne le reconstruit pas, on bascule dessus. C'est ce qui garantit
# que la production sert les octets exacts qui ont été regardés sur dev.
if [[ "$CIBLE" == "prod" && -f "${RELEASE_DIR}/index.html" ]]; then
  echo "artéfact déjà construit — promotion sans reconstruction"
else
  if [[ "$CIBLE" == "prod" ]]; then
    echo "ATTENTION: aucun artéfact pour ${SHA}, construction depuis la source."
    echo "La production ne servira donc pas un artéfact déjà vu sur dev."
  fi

  cd "$CHECKOUT_DIR"

  # `git fetch --all --prune` already brings in origin/main, which contains the
  # SHA. Never `git fetch origin <SHA>` — GitHub's upload-pack rejects fetching by
  # raw SHA with "not our ref" for commits it does not directly advertise.
  git fetch --all --prune
  git checkout -f "$SHA"

  npm ci
  npm run build

  rm -rf "$RELEASE_DIR"
  mkdir -p "$RELEASE_DIR"

  # -rltD, not -a. `-a` implies -og and tries to preserve source owner/group,
  # which fails as vwdeploy.
  rsync -rltD --delete dist/ "${RELEASE_DIR}/"
fi

# Atomic symlink flip: `mv -T` renames over the existing link in one syscall,
# so nginx never observes a missing document root.
ln -sfn "$RELEASE_DIR" "${ROOT_DIR}/.${CIBLE}.tmp"
mv -Tf "${ROOT_DIR}/.${CIBLE}.tmp" "${ROOT_DIR}/${CIBLE}"

echo "${CIBLE} now serving ${SHA}"

# Keep the last N releases so promotion and rollback always have a target.
# Never prune whatever dev or prod currently point at.
CURRENT_DEV=""
CURRENT_PROD=""
[[ -L "${ROOT_DIR}/dev" ]]  && CURRENT_DEV="$(readlink -f "${ROOT_DIR}/dev")"
[[ -L "${ROOT_DIR}/prod" ]] && CURRENT_PROD="$(readlink -f "${ROOT_DIR}/prod")"

# shellcheck disable=SC2012
ls -1dt "${RELEASES_DIR}"/*/ 2>/dev/null | tail -n "+$((KEEP_RELEASES + 1))" | while read -r old; do
  old_real="$(readlink -f "$old")"
  if [[ "$old_real" == "$CURRENT_DEV" || "$old_real" == "$CURRENT_PROD" ]]; then
    continue
  fi
  echo "pruning $old_real"
  rm -rf "$old_real"
done

echo "=== deploy ok ${SHA} -> ${CIBLE} ==="
