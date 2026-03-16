# React Template

Frontend starter for product teams who want a clean React + Vite baseline with:
- explicit page/container/layout structure
- Redux Toolkit wiring with both thunk and RTK Query reference flows
- mock-first demo flows that boot without a backend
- deterministic worktree setup for Codex and human developers
- a local logs/metrics/traces stack for runtime validation
- repo-local docs, execution plans, and validation scripts

## Quick start

```bash
npm install
npm run worktree:bootstrap
npm run observability:up
npm run dev:worktree
```

The worktree bootstrap writes `.codex/worktree.env`, derives stable app and observability ports from the worktree path, generates docs, and runs the repo validation checks.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the default Vite dev server |
| `npm run dev:worktree` | Start Vite on the deterministic worktree port |
| `npm run build` | Build the production bundle |
| `npm run arch:check` | Enforce repo architecture boundaries |
| `npm run docs:generate` | Regenerate derived docs such as the route map |
| `npm run docs:validate` | Validate docs structure and freshness |
| `npm run quality:score` | Print the current harness score |
| `npm run clean:artifacts` | Remove disposable browser and build artifacts from the workspace |
| `npm run observability:up` | Start the local Grafana/Prometheus/Loki/Tempo stack |
| `npm run observability:status` | Show the current local observability services |
| `npm run observability:query -- <kind> "<query>"` | Query metrics, logs, or traces from the local stack |
| `npm run ui:smoke` | Drive the registered routes in a real browser via Playwright CLI |
| `npm run verify` | Run lint, build, docs validation, architecture checks, and quality scoring |

## Structure

```text
src/
├── apiCall/                 # Shared API helpers and RTK base query
├── components/              # Reusable presentational components
├── containers/              # Feature implementations and shared layout shells
├── pages/                   # Thin route wrappers that render containers
├── routes/                  # Route registry and router wiring
├── shared/                  # Cross-cutting utilities, mock data, observability
└── store/                   # Redux store, slices, and RTK Query endpoints
```

The current route registry lives in `src/routes/routeCatalog.js`. Regenerate `docs/generated/route-map.md` after any route change.

The template currently ships with:
- `/login` as the thunk-backed auth example
- `/todos` as the RTK Query example
- `/observability` as the runtime inspection surface

## Harness layer

This template bakes in the core repo mechanics needed for an agent-friendly frontend project:
- `AGENTS.md` as a short table of contents
- structured docs under `docs/`
- execution plans under `docs/exec-plans/`
- deterministic worktree metadata in `.codex/worktree.env`
- architecture, docs, and quality scripts under `scripts/`
- local runtime signals exposed at `/observability`
- local Grafana, Prometheus, Loki, and Tempo services for logs/metrics/traces
- browser smoke validation via `scripts/ui-smoke.sh` and `playwright-cli.json`
- a smoke runner that prefers the Codex Playwright wrapper and otherwise uses the repo-pinned CLI

## Docs

Start with:
- `AGENTS.md`
- `docs/README.md`
- `docs/WORKFLOW.md`
- `docs/ARCHITECTURE.md`
- `docs/FRONTEND.md`
- `docs/OBSERVABILITY.md`
- `docs/MULTI_AGENT.md`

## Notes

- `.buildParams.stage` and `.buildParams.master` are committed placeholders for environment-based build flows.
- `.env.example` documents the runtime env contract for local work.
- `.codex/worktree.env` now includes worktree-specific observability URLs as well as the app port.
- `npm run clean:artifacts` prunes disposable `dist/` and Playwright output after validation runs.
- `.nvmrc` pins the intended Node version for this repo.
