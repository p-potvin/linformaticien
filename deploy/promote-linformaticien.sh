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

show_status() {
  echo "dev  -> $(readlink -f "${ROOT_DIR}/dev" 2>/dev/null || echo '(none)')"
  echo "prod -> $(readlink -f "${ROOT_DIR}/prod" 2>/dev/null || echo '(none)')"
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
  current="$(readlink -f "${ROOT_DIR}/prod" 2>/dev/null || true)"
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
    dev_target="$(readlink -f "${ROOT_DIR}/dev" 2>/dev/null || true)"
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
