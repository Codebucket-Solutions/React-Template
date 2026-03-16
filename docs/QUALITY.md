# Quality

## Goals
- Build passes
- Lint passes
- Docs stay in sync with the codebase
- Architecture boundaries stay enforced
- Changes remain small and easy to review

## Verification commands
- `npm run lint`
- `npm run build`
- `npm run docs:generate`
- `npm run docs:validate`
- `npm run arch:check`
- `npm run quality:score`
- `npm run verify`

## Optional higher-signal validation
- `npm run ui:smoke`
- `npm run observability:status`
- `npm run observability:query -- metrics "react_template_frontend_runtime_events_total"`

Use the browser smoke check when routes, layout, styling, or runtime signals change.
Use the observability checks when API flows, runtime events, or telemetry wiring change.
