import { context, metrics } from '@opentelemetry/api';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http/build/esm/platform/browser/index.js';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http/build/esm/platform/browser/index.js';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http/build/esm/platform/browser/index.js';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { LoggerProvider } from '@opentelemetry/sdk-logs';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs/build/esm/platform/browser/index.js';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { BatchSpanProcessor, WebTracerProvider } from '@opentelemetry/sdk-trace-web';

const STORE_KEY = '__REACT_TEMPLATE_TELEMETRY__';
const TELEMETRY_IGNORE_PATTERNS = [/\/telemetry\/v1\/(logs|metrics|traces)$/, /\/v1\/(logs|metrics|traces)$/];

const createStore = () => ({
  enabled: false,
  initialized: false,
  listeners: new Set(),
  serviceName: null,
  endpointBaseUrl: null,
  endpoints: {
    logs: null,
    metrics: null,
    traces: null,
  },
  lastExportedEvent: null,
  lastError: null,
  instruments: null,
  logger: null,
  tracer: null,
  loggerProvider: null,
  meterProvider: null,
  tracerProvider: null,
  forceFlush: null,
  unregisterInstrumentations: null,
  snapshot: {
    enabled: false,
    initialized: false,
    serviceName: null,
    endpointBaseUrl: null,
    endpoints: {
      logs: null,
      metrics: null,
      traces: null,
    },
    lastExportedEvent: null,
    lastError: null,
  },
});

const getStore = () => {
  if (typeof window === 'undefined') {
    return createStore();
  }

  if (!window[STORE_KEY]) {
    window[STORE_KEY] = createStore();
  }

  return window[STORE_KEY];
};

const notify = () => {
  const store = getStore();
  store.listeners.forEach((listener) => listener());
};

const syncSnapshot = (store) => {
  store.snapshot = {
    enabled: store.enabled,
    initialized: store.initialized,
    serviceName: store.serviceName,
    endpointBaseUrl: store.endpointBaseUrl,
    endpoints: store.endpoints,
    lastExportedEvent: store.lastExportedEvent,
    lastError: store.lastError,
  };

  return store.snapshot;
};

const getEnv = () => ({
  enabled: import.meta.env.VITE_OTEL_ENABLED !== 'false',
  endpointBaseUrl: import.meta.env.VITE_OTEL_EXPORTER_OTLP_BASE_URL,
  exportIntervalMs: Number(import.meta.env.VITE_OTEL_EXPORT_INTERVAL_MS || '5000'),
  serviceName: import.meta.env.VITE_OTEL_SERVICE_NAME || 'react-template-web',
  nodeEnv: import.meta.env.VITE_NODE_ENV || 'development',
  worktreeName: import.meta.env.VITE_WORKTREE_NAME || 'default',
});

const buildEndpoints = (baseUrl) => ({
  logs: `${baseUrl}/v1/logs`,
  metrics: `${baseUrl}/v1/metrics`,
  traces: `${baseUrl}/v1/traces`,
});

const normalizeBaseUrl = (value) => String(value || '').replace(/\/$/, '');

const toSeverity = (eventType) => {
  if (/error|unhandledrejection/i.test(eventType)) {
    return {
      severityNumber: SeverityNumber.ERROR,
      severityText: 'ERROR',
    };
  }

  return {
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
  };
};

const toLogAttributes = (entry) => {
  const attributes = {
    'event.id': entry.id,
    'event.type': entry.type,
    'event.timestamp': entry.timestamp,
  };

  Object.entries(entry.payload || {}).forEach(([key, value]) => {
    const attributeKey = `payload.${key}`;

    if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      attributes[attributeKey] = value;
      return;
    }

    attributes[attributeKey] = JSON.stringify(value);
  });

  return attributes;
};

const toSpanAttributes = (entry) => {
  const attributes = {
    'event.type': entry.type,
  };

  Object.entries(entry.payload || {}).forEach(([key, value]) => {
    if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      attributes[`payload.${key}`] = value;
      return;
    }

    attributes[`payload.${key}`] = JSON.stringify(value);
  });

  return attributes;
};

export const getTelemetrySnapshot = () => {
  const store = getStore();
  return store.snapshot;
};

export const subscribeTelemetryState = (listener) => {
  const store = getStore();
  store.listeners.add(listener);

  return () => {
    store.listeners.delete(listener);
  };
};

export const initializeTelemetry = () => {
  if (typeof window === 'undefined') {
    return getTelemetrySnapshot();
  }

  const store = getStore();
  if (store.initialized) {
    return getTelemetrySnapshot();
  }

  const env = getEnv();
  const endpointBaseUrl = normalizeBaseUrl(env.endpointBaseUrl);
  store.serviceName = env.serviceName;
  store.endpointBaseUrl = endpointBaseUrl;
  store.endpoints = buildEndpoints(endpointBaseUrl);
  store.initialized = true;

  if (!env.enabled || !endpointBaseUrl) {
    store.enabled = false;
    syncSnapshot(store);
    notify();
    return getTelemetrySnapshot();
  }

  try {
    const resource = resourceFromAttributes({
      'service.name': env.serviceName,
      'service.namespace': 'react-template',
      'service.instance.id': env.worktreeName,
      'deployment.environment.name': env.nodeEnv,
      'codex.worktree.name': env.worktreeName,
    });

    const tracerProvider = new WebTracerProvider({
      resource,
      spanProcessors: [
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: store.endpoints.traces,
          }),
          {
            scheduledDelayMillis: 1000,
          },
        ),
      ],
    });

    const metricReader = new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({
        url: store.endpoints.metrics,
      }),
      exportIntervalMillis: env.exportIntervalMs,
    });

    const meterProvider = new MeterProvider({
      resource,
      readers: [metricReader],
    });

    const loggerProvider = new LoggerProvider({
      resource,
      processors: [
        new BatchLogRecordProcessor(
          new OTLPLogExporter({
            url: store.endpoints.logs,
          }),
          {
            scheduledDelayMillis: 1000,
          },
        ),
      ],
    });

    tracerProvider.register();
    metrics.setGlobalMeterProvider(meterProvider);
    logs.setGlobalLoggerProvider(loggerProvider);

    const unregisterInstrumentations = registerInstrumentations({
      tracerProvider,
      meterProvider,
      loggerProvider,
      instrumentations: [
        new DocumentLoadInstrumentation(),
        new FetchInstrumentation({
          ignoreUrls: TELEMETRY_IGNORE_PATTERNS,
        }),
        new XMLHttpRequestInstrumentation({
          ignoreUrls: TELEMETRY_IGNORE_PATTERNS,
        }),
        new UserInteractionInstrumentation(),
      ],
    });

    const meter = meterProvider.getMeter(env.serviceName);

    store.instruments = {
      runtimeEvents: meter.createCounter('frontend_runtime_events', {
        description: 'Structured frontend runtime events emitted by the template.',
      }),
      routeViews: meter.createCounter('frontend_route_views', {
        description: 'Route view events emitted from the React app.',
      }),
      apiDuration: meter.createHistogram('frontend_api_duration_ms', {
        description: 'API durations captured from runtime signals.',
        unit: 'ms',
      }),
      frontendErrors: meter.createCounter('frontend_errors', {
        description: 'Frontend error events emitted through runtime signals.',
      }),
    };

    store.logger = loggerProvider.getLogger(env.serviceName);
    store.tracer = tracerProvider.getTracer(env.serviceName);
    store.loggerProvider = loggerProvider;
    store.meterProvider = meterProvider;
    store.tracerProvider = tracerProvider;
    store.forceFlush = async () => {
      await Promise.allSettled([
        loggerProvider.forceFlush(),
        meterProvider.forceFlush(),
        tracerProvider.forceFlush(),
      ]);
    };
    store.enabled = true;
    store.unregisterInstrumentations = unregisterInstrumentations;
  } catch (error) {
    store.enabled = false;
    store.lastError = error instanceof Error ? error.message : String(error);
  }

  syncSnapshot(store);
  notify();
  return getTelemetrySnapshot();
};

export const forwardRuntimeEvent = (entry) => {
  if (typeof window === 'undefined') {
    return;
  }

  const store = getStore();
  if (!store.enabled || !store.logger || !store.instruments) {
    return;
  }

  const severity = toSeverity(entry.type);

  try {
    const eventSpan = store.tracer?.startSpan(`runtime:${entry.type}`, {
      attributes: toSpanAttributes(entry),
    });

    store.instruments.runtimeEvents.add(1, {
      event_type: entry.type,
    });

    if (entry.type === 'route.view') {
      store.instruments.routeViews.add(1, {
        path: entry.payload?.path || 'unknown',
      });
    }

    if (typeof entry.payload?.durationMs === 'number' && entry.type.startsWith('api.')) {
      store.instruments.apiDuration.record(entry.payload.durationMs, {
        event_type: entry.type,
        status: String(entry.payload?.status || 'unknown'),
      });
    }

    if (/error|unhandledrejection/i.test(entry.type)) {
      store.instruments.frontendErrors.add(1, {
        event_type: entry.type,
      });
    }

    store.logger.emit({
      eventName: entry.type,
      timestamp: Date.parse(entry.timestamp),
      observedTimestamp: Date.now(),
      severityNumber: severity.severityNumber,
      severityText: severity.severityText,
      body: entry.type,
      attributes: toLogAttributes(entry),
      context: context.active(),
    });

    eventSpan?.end();
    store.lastExportedEvent = {
      type: entry.type,
      timestamp: entry.timestamp,
    };
    store.lastError = null;
  } catch (error) {
    store.lastError = error instanceof Error ? error.message : String(error);
  }

  void store.forceFlush?.();
  syncSnapshot(store);
  notify();
};
