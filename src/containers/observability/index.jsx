import { useSyncExternalStore } from 'react';
import {
  getTelemetrySnapshot,
  subscribeTelemetryState,
} from '../../shared/observability/telemetry';
import { getRuntimeEvents, subscribeRuntimeEvents } from '../../shared/observability/runtimeSignals';
import styles from './styles.module.scss';

const environmentRows = [
  ['Mock API', import.meta.env.VITE_ENABLE_MOCK_API ?? 'true'],
  ['Runtime observability', import.meta.env.VITE_ENABLE_RUNTIME_OBSERVABILITY ?? 'true'],
  ['OTLP export enabled', import.meta.env.VITE_OTEL_ENABLED ?? 'true'],
  ['Worktree name', import.meta.env.VITE_WORKTREE_NAME ?? 'default'],
  ['Worktree port', import.meta.env.VITE_DEV_PORT ?? '5173'],
];

const stackRows = [
  ['Stack name', import.meta.env.VITE_OBSERVABILITY_STACK_NAME ?? 'not configured'],
  ['Collector', import.meta.env.VITE_OBSERVABILITY_COLLECTOR_URL ?? 'not configured'],
  ['Prometheus', import.meta.env.VITE_OBSERVABILITY_PROMETHEUS_URL ?? 'not configured'],
  ['Loki', import.meta.env.VITE_OBSERVABILITY_LOKI_URL ?? 'not configured'],
  ['Tempo', import.meta.env.VITE_OBSERVABILITY_TEMPO_URL ?? 'not configured'],
  ['Grafana', import.meta.env.VITE_OBSERVABILITY_GRAFANA_URL ?? 'not configured'],
];

const queryExamples = [
  'npm run observability:query -- metrics "sum(rate(react_template_frontend_runtime_events_total[5m]))"',
  'npm run observability:query -- logs "{service_name=~\\".+\\"} |= \\"route.view\\""',
  'npm run observability:query -- traces "{ name = \\"runtime:route.view\\" }"',
];

const ObservabilityContainer = () => {
  const events = useSyncExternalStore(subscribeRuntimeEvents, getRuntimeEvents, getRuntimeEvents);
  const telemetry = useSyncExternalStore(
    subscribeTelemetryState,
    getTelemetrySnapshot,
    getTelemetrySnapshot,
  );

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Runtime signals</p>
          <h1>Observability Console</h1>
          <p>
            This view keeps route and API events legible in-browser while also surfacing the local
            logs, metrics, and traces stack wired into the template.
          </p>
        </div>

        <div className={styles.metaCard}>
          <h2>Environment</h2>
          <dl>
            {environmentRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className={styles.stackGrid}>
        <article className={styles.metaCard}>
          <h2>Stack endpoints</h2>
          <dl>
            {stackRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className={styles.metaCard}>
          <h2>Telemetry bridge</h2>
          <dl>
            <div>
              <dt>Service name</dt>
              <dd>{telemetry.serviceName || 'not initialized'}</dd>
            </div>
            <div>
              <dt>OTLP base URL</dt>
              <dd>{telemetry.endpointBaseUrl || 'not configured'}</dd>
            </div>
            <div>
              <dt>Last exported event</dt>
              <dd>{telemetry.lastExportedEvent?.type || 'none yet'}</dd>
            </div>
            <div>
              <dt>Exporter status</dt>
              <dd>{telemetry.lastError ? `error: ${telemetry.lastError}` : telemetry.enabled ? 'ready' : 'disabled'}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className={styles.queryPanel}>
        <div className={styles.feedHeader}>
          <h2>Query surfaces</h2>
          <span>PromQL, LogQL, and TraceQL helpers</span>
        </div>

        <div className={styles.snippetList}>
          {queryExamples.map((example) => (
            <article key={example} className={styles.snippetCard}>
              <pre>{example}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.eventFeed}>
        <div className={styles.feedHeader}>
          <h2>Latest events</h2>
          <span>{events.length} captured</span>
        </div>

        {events.length === 0 ? (
          <p className={styles.emptyState}>
            No events captured yet. Navigate between routes or trigger a query to populate the
            local feed.
          </p>
        ) : (
          <div className={styles.eventList}>
            {events.map((event) => (
              <article key={event.id} className={styles.eventCard}>
                <header>
                  <strong>{event.type}</strong>
                  <time>{event.timestamp}</time>
                </header>
                <pre>{JSON.stringify(event.payload, null, 2)}</pre>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default ObservabilityContainer;
