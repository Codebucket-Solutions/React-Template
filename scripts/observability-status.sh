#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKTREE_ENV="$ROOT_DIR/.codex/worktree.env"
COMPOSE_FILE="$ROOT_DIR/docker/docker-compose.observability.yml"

if [[ ! -f "$WORKTREE_ENV" ]]; then
  npm --prefix "$ROOT_DIR" run --silent worktree:env >/dev/null
fi

set -a
# shellcheck disable=SC1090
source "$WORKTREE_ENV"
set +a

docker compose -f "$COMPOSE_FILE" --project-name "$OBS_STACK_PROJECT" ps
