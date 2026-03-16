# Import Meta Env Runtime Setup

This document explains the exact steps implemented in this project to support runtime environment variables using `import-meta-env` with Docker + Nginx.

## Goal

Build the frontend once, then inject `VITE_*` values at container startup (runtime), instead of hardcoding values at build time.

## 1. Install Plugin

Added dependency:

- `@import-meta-env/unplugin`

Files updated:

- `package.json`
- `package-lock.json`

## 2. Configure Vite

Enabled the plugin in `vite.config.js`:

```js
import importMetaEnv from '@import-meta-env/unplugin'

plugins: [
  react(),
  importMetaEnv.vite({
    example: '.env.example',
  }),
]
```

Why:

- This transforms `import.meta.env.VITE_*` access for production runtime resolution.

## 3. Define Runtime Env Contract

Created `.env.example` with all expected `VITE_*` keys, for example:

- `VITE_API_BASE_URL=`
- `VITE_REACT_APP_IMAGE_URL=`
- `VITE_REACT_APP_ITEMS_PER_PAGE=`

Why:

- Plugin uses this file to know which env keys are valid.

## 4. Add Runtime Env Bootstrap File

Created `public/__import_meta_env__.js`:

```js
globalThis.import_meta_env = globalThis.import_meta_env || {};
```

Why:

- Ensures `globalThis.import_meta_env` exists before app bundle executes.

## 5. Load Bootstrap Before App Script

Updated `index.html`:

```html
<script src="/__import_meta_env__.js"></script>
<script type="module" src="/src/main.jsx"></script>
```

Why:

- Runtime env object must be available before Vite bundle runs.

## 6. Inject Env at Container Startup

Created `docker/runtime-env.sh`.

Current behavior:

- Reads all container environment variables.
- Picks only variables that start with `VITE_`.
- Generates `/usr/share/nginx/html/__import_meta_env__.js` dynamically.

This prevents misses when developers add new `VITE_*` keys in `.env.example`.

## 7. Run Runtime Script in Nginx Image

Updated both Dockerfiles:

- `docker/Dockerfile`
- `docker/Dockerfile.stage`

Added:

```dockerfile
COPY docker/runtime-env.sh /docker-entrypoint.d/40-runtime-env.sh
RUN chmod +x /docker-entrypoint.d/40-runtime-env.sh
```

Why:

- Nginx entrypoint executes scripts from `/docker-entrypoint.d` before starting Nginx.
- Script writes runtime env JS file on each container start.

## 8. Pass Env to Containers via Compose

Added `env_file` to:

- `docker/docker-compose.yml`
- `docker/docker-compose-stage.yml`

```yaml
env_file:
  - /home/ENV/MADInfluence-CRM-Frontend/.env
```

Why:

- Ensures container receives `VITE_*` values used by `runtime-env.sh`.

## 9. Important `.env` Format Rule

Use strict `KEY=VALUE` format.

Correct:

```env
VITE_API_BASE_URL=https://example.com/api
```

Wrong:

```env
VITE_API_BASE_URL = https://example.com/api
```

Spaces around `=` can break `env_file` parsing.

## 10. Verification Checklist (Server)

1. Check container has vars:

```bash
docker exec -it madinfluence-crm-frontend sh -c 'printenv | grep "^VITE_" | sort'
```

2. Check generated runtime file in container:

```bash
docker exec -it madinfluence-crm-frontend cat /usr/share/nginx/html/__import_meta_env__.js
```

3. Check what Nginx serves:

```bash
curl -s http://127.0.0.1/__import_meta_env__.js
```

4. Check public domain response:

```bash
curl -s https://madcrm.codebucketstage.online/__import_meta_env__.js
```

If local container file is correct but domain response is old, issue is usually cache/LB/old instance.

## 11. Redeploy Command (When Env Changes)

```bash
docker compose -f docker-compose.yml down
docker compose -f docker-compose.yml up -d --force-recreate
```

This ensures runtime script regenerates `__import_meta_env__.js` with latest values.
