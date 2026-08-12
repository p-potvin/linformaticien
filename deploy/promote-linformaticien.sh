#!/usr/bin/env bash
# Promote a built release to production — runs on greencloud-vps.
# Installed at: /var/www/deploy-scripts/promote-linformaticien.sh
#
#   promote-linformaticien.sh              # promote whatever dev is serving
#   promote-linformaticien.sh <sha>        # promote a specific release
#   promote-linformaticien.sh --rollback   # go back to the previous production release
#   promote-linformaticien.sh --status     # show what dev and prod are serving
#
# No build happens here. The artifact promoted is byte-for-byte the one that was
# verified on dev — that is the whole point of the split.
#
# Mise à jour : Wed, 12 Aug 2026 10:14

set -euo pipefail

ROOT_DIR="/var/www/linformaticien"
RELEASES_DIR="${ROOT_DIR}/releases"
PREV_MARK="${ROOT_DIR}/.prod-previous"

# `readlink -f` canonicalizes a path that does not exist and exits 0, so on an
# unpromoted host it would report `prod -> /var/www/linformaticien/prod`, which
# reads like prod points at itself. Resolve only actual symlinks.
link_target() {
  local link="$1"
  if [[ -L "$link" ]]; then
    readlink -f "$link"
  fi
}

show_status() {
  local dev prod
  dev="$(link_target "${ROOT_DIR}/dev")"
  prod="$(link_target "${ROOT_DIR}/prod")"
  echo "dev  -> ${dev:-(not deployed)}"
  echo "prod -> ${prod:-(not promoted)}"
  if [[ -f "$PREV_MARK" ]]; then
    echo "prev -> $(cat "$PREV_MARK")"
  fi
}

flip_prod_to() {
  local target="$1"

  if [[ ! -d "$target" ]]; then
    echo "release not found: $target" >&2
    exit 1
  fi
  if [[ ! -f "${target}/index.html" ]]; then
    echo "refusing to promote: no index.html in ${target}" >&2
    exit 1
  fi

  local current
  current="$(link_target "${ROOT_DIR}/prod")"
  if [[ -n "$current" && "$current" != "$target" ]]; then
    echo "$current" > "$PREV_MARK"
  fi

  ln -sfn "$target" "${ROOT_DIR}/.prod.tmp"
  mv -Tf "${ROOT_DIR}/.prod.tmp" "${ROOT_DIR}/prod"

  echo "prod now serving $(basename "$target")"
}

case "${1:-}" in
  --status)
    show_status
    ;;
  --rollback)
    if [[ ! -f "$PREV_MARK" ]]; then
      echo "no previous production release recorded" >&2
      exit 1
    fi
    flip_prod_to "$(cat "$PREV_MARK")"
    ;;
  "")
    dev_target="$(link_target "${ROOT_DIR}/dev")"
    if [[ -z "$dev_target" ]]; then
      echo "dev is not pointing at a release yet" >&2
      exit 1
    fi
    flip_prod_to "$dev_target"
    ;;
  *)
    flip_prod_to "${RELEASES_DIR}/$1"
    ;;
esac

show_status
