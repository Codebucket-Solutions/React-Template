# Frontend

## Page and container pattern
- Use `src/pages/<feature>/index.jsx` as a thin route wrapper.
- Put feature implementation in `src/containers/<feature>/index.jsx`.
- Put shared shells and frame components in `src/containers/layout/`.

## State and API pattern
- Shared request helpers belong in `src/apiCall/`.
- RTK Query endpoints belong in `src/store/slices/<feature>/`.
- `createAsyncThunk` flows belong in `src/store/slices/<feature>/` when the workflow is imperative, auth-oriented, or submit-driven rather than cache-oriented.
- Avoid page-local async state when the flow is shared or route-level.
- Prefer mock-first examples controlled by env flags so the template stays bootable.
- This template intentionally keeps both async references: `/todos` for RTK Query and `/login` for thunk-driven auth.

## Route pattern
- Register routes in `src/routes/routeCatalog.js`.
- Keep labels, titles, descriptions, and smoke text there so docs and browser validation can derive from one source.

## Runtime signals
- Use `src/shared/observability/runtimeSignals.js` for lightweight structured runtime events.
- Use `src/shared/observability/telemetry.js` to bridge those events into the local OTLP stack.
- Expose browser-readable signals for route loads, API traffic, and frontend errors before adding page-local telemetry code.

## CSS and layout
- Use CSS modules for feature and layout styles.
- Keep global styles minimal and push page-level visuals into the layout shell or feature containers.
