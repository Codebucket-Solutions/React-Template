#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKTREE_ENV="$ROOT_DIR/.codex/worktree.env"

if [[ -f "$WORKTREE_ENV" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$WORKTREE_ENV"
  set +a
fi

BASE_URL="${1:-${VITE_WORKTREE_BASE_URL:-http://127.0.0.1:${VITE_DEV_PORT:-4173}}}"
ARTIFACT_DIR="${PLAYWRIGHT_ARTIFACT_DIR:-$ROOT_DIR/output/playwright/ui-smoke}"
SESSION_PREFIX="${PLAYWRIGHT_CLI_SESSION:-rt-smoke-$RANDOM}"

export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
PWCLI_DEFAULT="$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh"
PWCLI_LOCAL="$ROOT_DIR/node_modules/.bin/playwright-cli"

mkdir -p "$ARTIFACT_DIR"
pushd "$ARTIFACT_DIR" >/dev/null

if [[ -x "${PWCLI:-$PWCLI_DEFAULT}" ]]; then
  CLI=("${PWCLI:-$PWCLI_DEFAULT}")
elif [[ -x "$PWCLI_LOCAL" ]]; then
  CLI=("$PWCLI_LOCAL")
else
  CLI=(npx --yes --package @playwright/cli playwright-cli)
fi

ROUTE_ROWS="$(cd "$ROOT_DIR" && node --input-type=module -e "import { routeCatalog } from './src/routes/routeCatalog.js'; console.log(routeCatalog.map((route) => [route.path, route.smokeText].join('\t')).join('\n'));")"

while IFS=$'\t' read -r route_path smoke_text; do
  [[ -n "$route_path" ]] || continue
  TARGET_URL="${BASE_URL%/}${route_path}"
  SESSION_NAME="${SESSION_PREFIX}-$(echo "${route_path#/}" | tr '/ ' '--' | sed 's/[^a-zA-Z0-9_-]//g')"
  [[ "$SESSION_NAME" != "${SESSION_PREFIX}-" ]] || SESSION_NAME="${SESSION_PREFIX}-root"

  echo "Validating ${TARGET_URL}"
  "${CLI[@]}" --config "$ROOT_DIR/playwright-cli.json" --session "$SESSION_NAME" open "$TARGET_URL"
  "${CLI[@]}" --config "$ROOT_DIR/playwright-cli.json" --session "$SESSION_NAME" snapshot
  PAGE_TEXT="$("${CLI[@]}" --config "$ROOT_DIR/playwright-cli.json" --session "$SESSION_NAME" eval "document.body.innerText")"
  if [[ "$PAGE_TEXT" != *"$smoke_text"* ]]; then
    echo "Missing expected smoke text: ${smoke_text}"
    "${CLI[@]}" --config "$ROOT_DIR/playwright-cli.json" --session "$SESSION_NAME" close || true
    exit 1
  fi
  "${CLI[@]}" --config "$ROOT_DIR/playwright-cli.json" --session "$SESSION_NAME" screenshot
  "${CLI[@]}" --config "$ROOT_DIR/playwright-cli.json" --session "$SESSION_NAME" close
done <<< "$ROUTE_ROWS"
popd >/dev/null
