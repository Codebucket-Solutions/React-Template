# Worktree Development

## Purpose
Each worktree should boot on a deterministic port so agents can run multiple isolated instances without manual coordination.

## Commands
```bash
npm run worktree:bootstrap
npm run dev:worktree
```

## Outputs
- `.codex/worktree.env` — generated local worktree metadata
- `output/playwright/` — browser smoke artifacts
- worktree-specific Grafana, Prometheus, Loki, Tempo, and collector URLs in `.codex/worktree.env`

Do not hand-edit `.codex/worktree.env`; regenerate it with `npm run worktree:env`.
Use `npm run clean:artifacts` to remove disposable browser output after validation runs.
