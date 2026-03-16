import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../../components/ui/button';
import { routeCatalog } from '../../../routes/routeCatalog';
import { recordRuntimeEvent } from '../../../shared/observability/runtimeSignals';
import { clearAuthSession } from '../../../store/slices/auth/authSlice';
import styles from './styles.module.scss';

const worktreeName = import.meta.env.VITE_WORKTREE_NAME || 'default';
const worktreePort = import.meta.env.VITE_DEV_PORT || '5173';

const AppShell = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.auth.session);

  const handleLogout = () => {
    if (session) {
      recordRuntimeEvent('auth.logout', {
        email: session.email,
        mode: session.mode,
      });
    }

    dispatch(clearAuthSession());
  };

  return (
    <div className={styles.shell}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>React Template</p>
          <h1 className={styles.title}>Agent-ready frontend starter</h1>
          <p className={styles.subtitle}>
            This workspace ships with page wrappers, container implementations, mock-first data,
            runtime signals, a local logs/metrics/traces stack, and browser validation hooks for
            Codex and human developers.
          </p>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaCard}>
            <span className={styles.metaLabel}>Worktree</span>
            <strong>{worktreeName}</strong>
            <span className={styles.metaValue}>127.0.0.1:{worktreePort}</span>
          </div>

          <div className={styles.metaCard}>
            <span className={styles.metaLabel}>Auth Session</span>
            <strong>{session ? session.name : 'No active session'}</strong>
            <span className={styles.metaValue}>
              {session ? `${session.email} · ${session.mode}` : 'Visit /login to test the thunk flow'}
            </span>
            {session ? (
              <div className={styles.metaAction}>
                <Button
                  type="button"
                  variant="primary_outline"
                  onClick={handleLogout}
                  button_text="Clear session"
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <nav className={styles.routeGrid} aria-label="Primary">
        {routeCatalog.map((route) => (
          <NavLink
            key={route.id}
            to={route.path}
            end={route.path === '/'}
            className={({ isActive }) =>
              `${styles.routeCard} ${isActive ? styles.routeCardActive : ''}`
            }
          >
            <span className={styles.routeLabel}>{route.label}</span>
            <strong>{route.title}</strong>
            <span className={styles.routeDescription}>{route.description}</span>
          </NavLink>
        ))}
      </nav>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
