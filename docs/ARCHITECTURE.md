# Architecture

## Purpose
This repository is a React + Vite frontend template intended to be extended for product UIs while preserving a stable, agent-legible developer experience.

## Core layers
- `src/pages/` — thin wrappers used by the router
- `src/containers/` — feature implementations and shared layout shells
- `src/components/` — reusable presentation primitives
- `src/store/` — Redux state, slices, and RTK Query endpoints
- `src/apiCall/` — API helpers and shared request plumbing
- `src/shared/` — cross-cutting utilities, runtime signals, mock data
- `src/routes/routeCatalog.js` — route registry and docs-generation source of truth

## Mechanical rules
- Pages should import containers, not store or API modules directly.
- Containers should not import page wrappers.
- Store and API modules must not depend on pages or containers.
- Routes may depend on page wrappers, route metadata, and shared layout shells only.

These rules are enforced by `npm run arch:check`.

## Current foundation
- route metadata in `src/routes/routeCatalog.js`
- shared shell in `src/containers/layout/appShell/`
- thunk-backed auth workflow in `src/store/slices/auth/`
- RTK Query base API in `src/apiCall/rtkBaseApi/baseApi.js`
- runtime signals in `src/shared/observability/runtimeSignals.js`
- OTLP bridge in `src/shared/observability/telemetry.js`
- generated route documentation in `docs/generated/route-map.md`

## Design intent
- Keep entrypoints explicit.
- Prefer mock-first examples so the template runs without a backend.
- Make routes, state, API activity, and runtime events legible to agents.
- Encode rules in scripts where possible, not only in prose.
