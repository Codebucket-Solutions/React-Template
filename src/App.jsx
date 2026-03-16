import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from './components/ui/loader';
import PagesRoute from './routes';
import { initializeTelemetry } from './shared/observability/telemetry';
import { ensureRuntimeObservers, recordRuntimeEvent } from './shared/observability/runtimeSignals';
import './App.css';

function App() {
  const notification = useSelector((state) => state.ui);
  const location = useLocation();

  useEffect(() => {
    initializeTelemetry();
    ensureRuntimeObservers();
  }, []);

  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_RUNTIME_OBSERVABILITY === 'false') {
      return;
    }

    recordRuntimeEvent('route.view', {
      path: location.pathname,
      search: location.search,
    });
  }, [location.pathname, location.search]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {notification.loading ? (
        <Loader active={notification.loading} loadingMessage={notification.loadingMessage} />
      ) : null}
      <PagesRoute />
    </>
  );
}

export default App;
