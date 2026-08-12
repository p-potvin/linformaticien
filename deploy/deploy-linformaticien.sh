#!/usr/bin/env bash
# Deploy L'Informaticien — runs on greencloud-vps as `vwdeploy`.
# Installed at: /var/www/deploy-scripts/deploy-linformaticien.sh
# Triggered by: vw-webhookd on a signed GitHub push to refs/heads/main.
#
# This script builds ONCE and publishes to the DEV environment only.
# Production is a separate, explicit promotion of the same artifact:
#   /var/www/deploy-scripts/promote-linformaticien.sh
#
# Mise à jour : Wed, 12 Aug 2026 10:14

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

echo "=== deploy linformaticien ${SHA} at $(date -Is) ==="

mkdir -p "$CHECKOUT_DIR" "$RELEASES_DIR"

export GIT_TERMINAL_PROMPT=0
export GIT_ASKPASS="/var/www/deploy-scripts/git-askpass-vw-gh-token.sh"

if [[ ! -d "${CHECKOUT_DIR}/.git" ]]; then
  find "$CHECKOUT_DIR" -mindepth 1 -delete
  git clone "$REPO_URL" "$CHECKOUT_DIR"
fi

cd "$CHECKOUT_DIR"

# `git fetch --all --prune` already brings in origin/main, which contains the
# SHA. Never `git fetch origin <SHA>` — GitHub's upload-pack rejects fetching by
# raw SHA with "not our ref" for commits it does not directly advertise.
git fetch --all --prune
git checkout -f "$SHA"

npm ci
npm run build

RELEASE_DIR="${RELEASES_DIR}/${SHA}"
rm -rf "$RELEASE_DIR"
mkdir -p "$RELEASE_DIR"

# -rltD, not -a. `-a` implies -og and tries to preserve source owner/group,
# which fails as vwdeploy.
rsync -rltD --delete dist/ "${RELEASE_DIR}/"

# Atomic symlink flip: `mv -T` renames over the existing link in one syscall,
# so nginx never observes a missing document root.
ln -sfn "$RELEASE_DIR" "${ROOT_DIR}/.dev.tmp"
mv -Tf "${ROOT_DIR}/.dev.tmp" "${ROOT_DIR}/dev"

echo "dev now serving ${SHA}"

# Keep the last N releases so promotion and rollback always have a target.
# Never prune whatever dev or prod currently point at.
CURRENT_DEV="$(readlink -f "${ROOT_DIR}/dev" || true)"
CURRENT_PROD="$(readlink -f "${ROOT_DIR}/prod" || true)"

# shellcheck disable=SC2012
ls -1dt "${RELEASES_DIR}"/*/ 2>/dev/null | tail -n "+$((KEEP_RELEASES + 1))" | while read -r old; do
  old_real="$(readlink -f "$old")"
  if [[ "$old_real" == "$CURRENT_DEV" || "$old_real" == "$CURRENT_PROD" ]]; then
    continue
  fi
  echo "pruning $old_real"
  rm -rf "$old_real"
done

echo "=== deploy ok ${SHA} ==="
