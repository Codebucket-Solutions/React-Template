import { forwardRuntimeEvent } from './telemetry';

const STORE_KEY = '__REACT_TEMPLATE_OBSERVABILITY__';
const MAX_EVENTS = 200;

const createStore = () => ({
  events: [],
  listeners: new Set(),
  installed: false,
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

const serializeError = (value) => {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return String(value);
  }
};

export const recordRuntimeEvent = (type, payload = {}) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const store = getStore();
  const entry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    type,
    timestamp: new Date().toISOString(),
    payload,
  };

  store.events = [entry, ...store.events].slice(0, MAX_EVENTS);
  store.listeners.forEach((listener) => listener());
  forwardRuntimeEvent(entry);

  return entry;
};

export const subscribeRuntimeEvents = (listener) => {
  const store = getStore();
  store.listeners.add(listener);

  return () => {
    store.listeners.delete(listener);
  };
};

export const getRuntimeEvents = () => getStore().events;

export const ensureRuntimeObservers = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const store = getStore();
  if (store.installed) {
    return;
  }

  window.addEventListener('error', (event) => {
    recordRuntimeEvent('window.error', {
      message: event.message,
      source: event.filename,
      line: event.lineno,
      column: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    recordRuntimeEvent('window.unhandledrejection', {
      reason: serializeError(event.reason),
    });
  });

  recordRuntimeEvent('runtime.ready', {
    href: window.location.href,
    userAgent: window.navigator.userAgent,
  });

  store.installed = true;
};
