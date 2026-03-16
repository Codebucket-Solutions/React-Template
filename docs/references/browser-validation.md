# Browser Validation

## Purpose
Use a real browser to confirm that registered routes render and expose expected smoke text.

## Command
```bash
npm run ui:smoke
```

## Expectations
- start the app with `npm run dev:worktree`
- start `npm run observability:up` when runtime observability is enabled and you want a quiet console
- artifacts should land in `output/playwright/`
- route coverage is derived from `src/routes/routeCatalog.js`

## Tooling
The smoke script prefers the local Codex Playwright wrapper when available, otherwise uses the repo-pinned `node_modules/.bin/playwright-cli`, and only falls back to `npx --package @playwright/cli playwright-cli` as a last resort.
