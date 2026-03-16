# Reliability

## Expectations
- The app should build from a fresh checkout after dependency installation.
- Bootstrap steps should stay scriptable.
- Avoid hidden local-machine dependencies.
- Keep worktree setup deterministic.
- Keep the template runnable even when no backend is available.

## Current reliability mechanisms
- `.nvmrc` pins the intended Node runtime
- `.buildParams.stage` and `.buildParams.master` document environment-driven builds
- `.env.example` defines the runtime env contract used by `import-meta-env`
- `npm run worktree:env` derives a stable local port per worktree
- `npm run dev:worktree` reuses that derived port
- `npm run clean:artifacts` removes disposable local build and browser artifacts without touching source files
- `.codex/worktree.env` includes stable Grafana, Prometheus, Loki, Tempo, and collector ports per worktree
- `npm run observability:up` starts the same local stack from the same generated worktree metadata
- mock-first RTK Query flows allow the template to boot without external APIs
