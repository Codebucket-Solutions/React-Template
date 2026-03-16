# Observability

## Purpose
This template ships with a local logs/metrics/traces stack so agents can validate UI and runtime behavior with queryable signals instead of relying only on console output.

## Stack
- OTLP collector for ingest
- Prometheus for metrics
- Loki for logs
- Tempo for traces
- Grafana for local exploration

## Commands
```bash
npm run worktree:bootstrap
npm run observability:up
npm run dev:worktree
npm run observability:status
npm run observability:query -- metrics "react_template_frontend_runtime_events_total"
npm run observability:query -- logs "{service_name=~\".+\"} |= \"route.view\""
npm run observability:query -- traces "{ name = \"runtime:route.view\" }"
```

## Runtime wiring
- The app exports OTLP telemetry through `/telemetry`, which Vite proxies to the local collector in worktree mode.
- `src/shared/observability/runtimeSignals.js` remains the in-browser event feed for fast local inspection.
- `src/shared/observability/telemetry.js` bridges runtime events into OTLP logs and metrics while browser instrumentation captures document, fetch, xhr, and interaction traces.

## Worktree metadata
`npm run worktree:env` writes the current worktree's collector, Prometheus, Loki, Tempo, and Grafana URLs into `.codex/worktree.env`.
The stack is isolated per worktree because both the ports and the Docker Compose project name are derived from that generated metadata.

## Agent expectations
- Start the stack before debugging runtime regressions.
- Use `npm run ui:smoke` for browser validation and `npm run observability:query` for follow-up inspection.
- Keep telemetry changes in shared observability utilities instead of page-local instrumentation.
- If the stack is down while runtime observability is enabled, the browser will still render but Vite will log OTLP proxy errors.
