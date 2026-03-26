# CLAUDE.md

This file is auto-loaded by Claude Code at conversation start.
For the full reading order and operating rules, see `AGENTS.md`.

## Quick reference

### Read in this order
1. `docs/WORKFLOW.md`
2. `docs/ARCHITECTURE.md`
3. `docs/FRONTEND.md`
4. `docs/QUALITY.md`
5. `docs/OBSERVABILITY.md` — when touching runtime validation, telemetry, or API flows
6. `docs/MULTI_AGENT.md` — when coordinating work across multiple agents or worktrees
7. Any file in `docs/exec-plans/active/` relevant to the task

### Operating rules
- Make the smallest safe change.
- Read files before editing them.
- Preserve the existing frontend template structure unless the task explicitly requires structural changes.
- Before adding API calls or shared state, inspect `src/apiCall/`, `src/store/`, and `src/shared/axios.js` first and extend those patterns instead of creating page-local REST clients or parallel state containers.
- Follow the existing page/layout structure: prefer `src/pages/<feature>/index.jsx` wrappers, `src/containers/<feature>/index.jsx` implementations, and `src/containers/layout/` for shared shells.
- Keep `src/routes/routeCatalog.js` as the route system of record and regenerate `docs/generated/route-map.md` after route changes.
- Create or update an execution plan before starting any non-trivial work.
- Update docs when routes, architecture, state management, build flow, or developer workflow changes.
- Run verification before finishing.

### Architecture layers
- `src/pages/` — thin route wrappers (import containers only)
- `src/containers/` — feature implementations and layout shells
- `src/components/` — reusable presentation primitives
- `src/store/` — Redux state, slices, RTK Query endpoints
- `src/apiCall/` — API helpers and shared request plumbing
- `src/shared/` — cross-cutting utilities, runtime signals, mock data
- `src/routes/routeCatalog.js` — single source of truth for routes

### Verification commands
```bash
npm run lint          # Code style
npm run build         # Production bundle
npm run arch:check    # Architecture boundary enforcement
npm run docs:generate # Regenerate route map
npm run docs:validate # Check doc freshness
npm run quality:score # Harness health signal
npm run verify        # All of the above
npm run ui:smoke      # Browser smoke test (Playwright)
```

### Worktree setup
Claude Code has built-in worktree support. When working in a worktree:
```bash
npm run worktree:bootstrap   # One-shot: install deps, generate env, validate
npm run dev:worktree          # Vite on deterministic port
npm run observability:up      # Start local Grafana/Prometheus/Loki/Tempo stack
```

### Important locations
- App source: `src/`
- Static assets: `public/`
- Docker files: `docker/`
- Harness docs: `docs/`
- Repo scripts: `scripts/`
- Route registry: `src/routes/routeCatalog.js`
- Codex config: `.codex/config.toml`
- Claude config: `.claude/settings.json`

### Mock-first design
The template runs without a backend. Toggle with env flags:
- `VITE_ENABLE_MOCK_API=true` — mock REST endpoints
- `VITE_ENABLE_MOCK_AUTH=true` — mock authentication
