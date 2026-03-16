#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKTREE_ENV="$ROOT_DIR/.codex/worktree.env"

if [[ ! -f "$WORKTREE_ENV" ]]; then
  npm --prefix "$ROOT_DIR" run --silent worktree:env >/dev/null
fi

set -a
# shellcheck disable=SC1090
source "$WORKTREE_ENV"
set +a

QUERY_KIND="${1:-metrics}"
shift || true
QUERY_TEXT="${*:-}"

urlencode() {
  node -e "console.log(encodeURIComponent(process.argv[1] || ''))" "$1"
}

now_ns() {
  node -e "console.log((BigInt(Date.now()) * 1000000n).toString())"
}

minutes_ago_ns() {
  node -e "const minutes = BigInt(process.argv[1] || '15'); console.log(((BigInt(Date.now()) - minutes * 60n * 1000n) * 1000000n).toString())" "$1"
}

DEFAULT_LOG_QUERY='{service_name=~".+"}'
DEFAULT_TRACE_QUERY='{ name = "runtime:route.view" }'

case "$QUERY_KIND" in
  metrics)
    QUERY_TEXT="${QUERY_TEXT:-react_template_frontend_runtime_events_total}"
    curl --fail --silent --show-error \
      "${OBS_PROMETHEUS_URL}/api/v1/query?query=$(urlencode "$QUERY_TEXT")"
    ;;
  logs)
    QUERY_TEXT="${QUERY_TEXT:-$DEFAULT_LOG_QUERY}"
    START_NS="$(minutes_ago_ns 15)"
    END_NS="$(now_ns)"
    curl --fail --silent --show-error \
      "${OBS_LOKI_URL}/loki/api/v1/query_range?query=$(urlencode "$QUERY_TEXT")&limit=50&direction=backward&start=${START_NS}&end=${END_NS}"
    ;;
  traces)
    QUERY_TEXT="${QUERY_TEXT:-$DEFAULT_TRACE_QUERY}"
    curl --fail --silent --show-error \
      "${OBS_TEMPO_URL}/api/search?q=$(urlencode "$QUERY_TEXT")"
    ;;
  *)
    cat <<EOF
Usage: npm run observability:query -- <metrics|logs|traces> "<query>"
Examples:
  npm run observability:query -- metrics "sum(rate(react_template_frontend_runtime_events_total[5m]))"
  npm run observability:query -- logs "{service_name=~\\".+\\"} |= \\"route.view\\""
  npm run observability:query -- traces "{ name = \\"runtime:route.view\\" }"
EOF
    exit 1
    ;;
esac
