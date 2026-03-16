import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const PORT_MIN = 4100;
const PORT_SPAN = 700;
const OBSERVABILITY_OFFSETS = {
  otlpHttp: 100,
  otlpGrpc: 101,
  prometheus: 200,
  loki: 300,
  tempo: 400,
  grafana: 500,
};

const sanitizeName = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'worktree';

export const getWorktreeMetadata = (cwd = process.cwd()) => {
  const root = path.resolve(cwd);
  const hash = crypto.createHash('sha256').update(root).digest('hex');
  const numericHash = Number.parseInt(hash.slice(0, 8), 16);
  const port = PORT_MIN + (numericHash % PORT_SPAN);
  const name = sanitizeName(path.basename(root));
  const observability = {
    projectName: sanitizeName(`react-template-${name}`),
    otlpHttpPort: port + OBSERVABILITY_OFFSETS.otlpHttp,
    otlpGrpcPort: port + OBSERVABILITY_OFFSETS.otlpGrpc,
    prometheusPort: port + OBSERVABILITY_OFFSETS.prometheus,
    lokiPort: port + OBSERVABILITY_OFFSETS.loki,
    tempoPort: port + OBSERVABILITY_OFFSETS.tempo,
    grafanaPort: port + OBSERVABILITY_OFFSETS.grafana,
  };

  return {
    root,
    name,
    port,
    baseUrl: `http://127.0.0.1:${port}`,
    artifactDir: path.join(root, 'output', 'playwright'),
    observabilityArtifactDir: path.join(root, 'output', 'observability'),
    envFilePath: path.join(root, '.codex', 'worktree.env'),
    observability: {
      ...observability,
      otlpHttpUrl: `http://127.0.0.1:${observability.otlpHttpPort}`,
      otlpGrpcUrl: `http://127.0.0.1:${observability.otlpGrpcPort}`,
      prometheusUrl: `http://127.0.0.1:${observability.prometheusPort}`,
      lokiUrl: `http://127.0.0.1:${observability.lokiPort}`,
      tempoUrl: `http://127.0.0.1:${observability.tempoPort}`,
      grafanaUrl: `http://127.0.0.1:${observability.grafanaPort}`,
    },
  };
};

export const writeWorktreeEnv = (cwd = process.cwd()) => {
  const metadata = getWorktreeMetadata(cwd);

  fs.mkdirSync(path.dirname(metadata.envFilePath), { recursive: true });
  fs.mkdirSync(metadata.artifactDir, { recursive: true });
  fs.mkdirSync(metadata.observabilityArtifactDir, { recursive: true });

  const envContents = [
    `VITE_DEV_PORT=${metadata.port}`,
    `VITE_WORKTREE_NAME=${metadata.name}`,
    `VITE_WORKTREE_BASE_URL=${metadata.baseUrl}`,
    `PLAYWRIGHT_ARTIFACT_DIR=${metadata.artifactDir}`,
    `OBS_STACK_PROJECT=${metadata.observability.projectName}`,
    `OBS_OTLP_HTTP_PORT=${metadata.observability.otlpHttpPort}`,
    `OBS_OTLP_GRPC_PORT=${metadata.observability.otlpGrpcPort}`,
    `OBS_PROMETHEUS_PORT=${metadata.observability.prometheusPort}`,
    `OBS_LOKI_PORT=${metadata.observability.lokiPort}`,
    `OBS_TEMPO_PORT=${metadata.observability.tempoPort}`,
    `OBS_GRAFANA_PORT=${metadata.observability.grafanaPort}`,
    `OBS_OTLP_HTTP_URL=${metadata.observability.otlpHttpUrl}`,
    `OBS_OTLP_GRPC_URL=${metadata.observability.otlpGrpcUrl}`,
    `OBS_PROMETHEUS_URL=${metadata.observability.prometheusUrl}`,
    `OBS_LOKI_URL=${metadata.observability.lokiUrl}`,
    `OBS_TEMPO_URL=${metadata.observability.tempoUrl}`,
    `OBS_GRAFANA_URL=${metadata.observability.grafanaUrl}`,
    'VITE_ENABLE_MOCK_API=true',
    'VITE_ENABLE_MOCK_AUTH=true',
    'VITE_ENABLE_RUNTIME_OBSERVABILITY=true',
    'VITE_OTEL_ENABLED=true',
    'VITE_OTEL_SERVICE_NAME=react-template-web',
    'VITE_OTEL_EXPORT_INTERVAL_MS=1000',
    'VITE_OTEL_EXPORTER_OTLP_BASE_URL=/telemetry',
    `VITE_OBSERVABILITY_STACK_NAME=${metadata.observability.projectName}`,
    `VITE_OBSERVABILITY_COLLECTOR_URL=${metadata.observability.otlpHttpUrl}`,
    `VITE_OBSERVABILITY_PROMETHEUS_URL=${metadata.observability.prometheusUrl}`,
    `VITE_OBSERVABILITY_LOKI_URL=${metadata.observability.lokiUrl}`,
    `VITE_OBSERVABILITY_TEMPO_URL=${metadata.observability.tempoUrl}`,
    `VITE_OBSERVABILITY_GRAFANA_URL=${metadata.observability.grafanaUrl}`,
  ].join('\n');

  fs.writeFileSync(metadata.envFilePath, `${envContents}\n`);

  return metadata;
};
