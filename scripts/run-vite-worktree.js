import fs from 'fs';
import { spawn } from 'child_process';
import { writeWorktreeEnv } from './lib/worktree.js';

const mode = process.argv[2] === 'preview' ? 'preview' : 'dev';
const metadata = writeWorktreeEnv();
const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const buildParamsFile = mode === 'preview' ? '.buildParams.master' : '.buildParams.stage';

const buildParams = fs
  .readFileSync(buildParamsFile, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .reduce((accumulator, line) => {
    const separatorIndex = line.indexOf('=');
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    accumulator[key] = value;
    return accumulator;
  }, {});

const args =
  mode === 'preview'
    ? ['vite', 'preview', '--host', '127.0.0.1', '--port', String(metadata.port), '--strictPort']
    : ['vite', '--host', '127.0.0.1', '--port', String(metadata.port), '--strictPort'];

console.log(`Starting ${mode} server for ${metadata.name} at ${metadata.baseUrl}`);

const child = spawn(command, args, {
  stdio: 'inherit',
  env: {
    ...buildParams,
    ...process.env,
    VITE_DEV_PORT: String(metadata.port),
    VITE_WORKTREE_NAME: metadata.name,
    VITE_WORKTREE_BASE_URL: metadata.baseUrl,
    OBS_STACK_PROJECT: metadata.observability.projectName,
    OBS_OTLP_HTTP_PORT: String(metadata.observability.otlpHttpPort),
    OBS_OTLP_GRPC_PORT: String(metadata.observability.otlpGrpcPort),
    OBS_PROMETHEUS_PORT: String(metadata.observability.prometheusPort),
    OBS_LOKI_PORT: String(metadata.observability.lokiPort),
    OBS_TEMPO_PORT: String(metadata.observability.tempoPort),
    OBS_GRAFANA_PORT: String(metadata.observability.grafanaPort),
    OBS_OTLP_HTTP_URL: metadata.observability.otlpHttpUrl,
    OBS_OTLP_GRPC_URL: metadata.observability.otlpGrpcUrl,
    OBS_PROMETHEUS_URL: metadata.observability.prometheusUrl,
    OBS_LOKI_URL: metadata.observability.lokiUrl,
    OBS_TEMPO_URL: metadata.observability.tempoUrl,
    OBS_GRAFANA_URL: metadata.observability.grafanaUrl,
    VITE_ENABLE_MOCK_API:
      process.env.VITE_ENABLE_MOCK_API || buildParams.VITE_ENABLE_MOCK_API || 'true',
    VITE_ENABLE_MOCK_AUTH:
      process.env.VITE_ENABLE_MOCK_AUTH || buildParams.VITE_ENABLE_MOCK_AUTH || 'true',
    VITE_ENABLE_RUNTIME_OBSERVABILITY:
      process.env.VITE_ENABLE_RUNTIME_OBSERVABILITY ||
      buildParams.VITE_ENABLE_RUNTIME_OBSERVABILITY ||
      'true',
    VITE_OTEL_ENABLED: process.env.VITE_OTEL_ENABLED || buildParams.VITE_OTEL_ENABLED || 'true',
    VITE_OTEL_SERVICE_NAME:
      process.env.VITE_OTEL_SERVICE_NAME || buildParams.VITE_OTEL_SERVICE_NAME || 'react-template-web',
    VITE_OTEL_EXPORT_INTERVAL_MS:
      process.env.VITE_OTEL_EXPORT_INTERVAL_MS || buildParams.VITE_OTEL_EXPORT_INTERVAL_MS || '1000',
    VITE_OTEL_EXPORTER_OTLP_BASE_URL:
      process.env.VITE_OTEL_EXPORTER_OTLP_BASE_URL ||
      buildParams.VITE_OTEL_EXPORTER_OTLP_BASE_URL ||
      '/telemetry',
    VITE_OBSERVABILITY_STACK_NAME: metadata.observability.projectName,
    VITE_OBSERVABILITY_COLLECTOR_URL: metadata.observability.otlpHttpUrl,
    VITE_OBSERVABILITY_PROMETHEUS_URL: metadata.observability.prometheusUrl,
    VITE_OBSERVABILITY_LOKI_URL: metadata.observability.lokiUrl,
    VITE_OBSERVABILITY_TEMPO_URL: metadata.observability.tempoUrl,
    VITE_OBSERVABILITY_GRAFANA_URL: metadata.observability.grafanaUrl,
  },
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
