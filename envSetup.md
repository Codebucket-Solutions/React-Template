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

Created `docker/runtime-env-entrypoint/main.go`, a tiny Go program compiled to a static binary that runs as the container `ENTRYPOINT`.

Current behavior:

- Reads all container environment variables.
- Picks only variables that start with `VITE_`.
- Writes them (sorted, JS-escaped) to `/tmp/react-template-runtime-env/__import_meta_env__.js` as
  `globalThis.import_meta_env = Object.assign(globalThis.import_meta_env || {}, { ... });`
- Then `exec`s the container command (nginx), so nginx stays PID 1.

`IMPORT_META_ENV_OUTPUT` can override the output path if needed.

Why a Go binary instead of a shell script:

- Needs no shell in the final image and does not depend on the nginx image's `/docker-entrypoint.d` hook.
- Writes under `/tmp`, so it keeps working when the container runs with a read-only root filesystem.

This prevents misses when developers add new `VITE_*` keys in `.env.example`.

## 7. Wire the Entrypoint in the Docker Image

Updated both Dockerfiles:

- `docker/Dockerfile`
- `docker/Dockerfile.stage`

In the build stage, the static stub from `public/` is replaced by a symlink to the runtime file:

```dockerfile
RUN rm -f dist/__import_meta_env__.js && ln -s /tmp/react-template-runtime-env/__import_meta_env__.js dist/__import_meta_env__.js
```

A dedicated Go stage compiles the injector for the target platform:

```dockerfile
FROM --platform=$BUILDPLATFORM golang:1.24-bullseye AS runtime-env-builder
COPY docker/runtime-env-entrypoint/main.go ./main.go
RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -trimpath -ldflags='-s -w' -o /out/runtime-env-entrypoint ./main.go
```

The nginx stage (base image, downloaded `nginx.conf`, port 80) is unchanged apart from copying the binary and using it as the entrypoint:

```dockerfile
COPY --chmod=755 --from=runtime-env-builder /out/runtime-env-entrypoint /usr/local/bin/runtime-env-entrypoint
ENTRYPOINT ["/usr/local/bin/runtime-env-entrypoint"]
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

Why:

- On every container start the entrypoint regenerates the runtime env JS file, then hands over to nginx.
- Nginx serves `/__import_meta_env__.js` through the symlink.

## 8. Pass Env to Containers via Compose

Added `env_file` to:

- `docker/docker-compose.yml`
- `docker/docker-compose-stage.yml`

```yaml
env_file:
  - /home/ENV/MADInfluence-CRM-Frontend/.env
```

Why:

- Ensures container receives `VITE_*` values used by the runtime env entrypoint.

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
docker exec -it madinfluence-crm-frontend cat /tmp/react-template-runtime-env/__import_meta_env__.js
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

This ensures the entrypoint regenerates `__import_meta_env__.js` with latest values.
