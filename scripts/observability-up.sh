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

docker compose -f "$COMPOSE_FILE" --project-name "$OBS_STACK_PROJECT" up -d

cat <<EOF
Observability stack is starting for ${OBS_STACK_PROJECT}
- Grafana: ${OBS_GRAFANA_URL}
- Prometheus: ${OBS_PROMETHEUS_URL}
- Loki: ${OBS_LOKI_URL}
- Tempo: ${OBS_TEMPO_URL}
- OTLP HTTP: ${OBS_OTLP_HTTP_URL}
EOF
