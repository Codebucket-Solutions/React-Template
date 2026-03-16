import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '../../components/ui/button';
import InputField from '../../components/ui/input';
import { demoAuthUsers } from '../../shared/mockData/demoData';
import { recordRuntimeEvent } from '../../shared/observability/runtimeSignals';
import { clearAuthFeedback, clearAuthSession } from '../../store/slices/auth/authSlice';
import { loginWithCredentials, shouldUseMockAuth } from '../../store/slices/auth/authThunk';
import styles from './styles.module.scss';

const initialCredentials = {
  email: demoAuthUsers[0].email,
  password: demoAuthUsers[0].password,
};

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { loginError, loginStatus, session } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState(initialCredentials);
  const isMockAuth = shouldUseMockAuth();

  useEffect(() => {
    if (loginStatus === 'failed' && loginError) {
      toast.error(loginError);
    }
  }, [loginError, loginStatus]);

  useEffect(() => {
    if (loginStatus === 'succeeded' && session) {
      toast.success(`Signed in as ${session.name}`);
    }
  }, [loginStatus, session]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    if (loginError) {
      dispatch(clearAuthFeedback());
    }

    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginWithCredentials(credentials));
  };

  const applyDemoAccount = (account) => {
    setCredentials({
      email: account.email,
      password: account.password,
    });

    dispatch(clearAuthFeedback());
    recordRuntimeEvent('auth.demo_account_selected', {
      email: account.email,
    });
  };

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
    <section className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Thunk reference</p>
          <h1>Login Example</h1>
          <p>
            This route keeps a real <code>createAsyncThunk</code> workflow in the template for
            imperative auth and submit-driven side effects, while <code>/todos</code> remains the
            RTK Query reference for cached server data.
          </p>
        </div>

        <div className={styles.modeCard}>
          <span className={styles.modeLabel}>Current mode</span>
          <strong>{isMockAuth ? 'Mock-first auth' : 'Live auth endpoint'}</strong>
          <span className={styles.modeValue}>
            {isMockAuth
              ? 'Uses bundled demo accounts until VITE_ENABLE_MOCK_AUTH=false with a live API base URL.'
              : 'Posts credentials to the configured LOGIN endpoint.'}
          </span>
        </div>
      </header>

      <div className={styles.layout}>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.cardEyebrow}>Session workflow</p>
              <h2>Sign in with the thunk example</h2>
            </div>
            <span className={styles.statusBadge} data-status={loginStatus}>
              {loginStatus}
            </span>
          </div>

          <InputField
            title="Email"
            type="email"
            name="email"
            placeholder="team@company.com"
            value={credentials.email}
            onChange={handleFieldChange}
          />

          <InputField
            title="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleFieldChange}
            showEye
          />

          {loginError ? <p className={styles.errorMessage}>{loginError}</p> : null}

          <div className={styles.actions}>
            <Button
              type="submit"
              variant="primary"
              disabled={loginStatus === 'pending'}
              button_text={loginStatus === 'pending' ? 'Signing in…' : 'Sign in'}
            />
            {session ? (
              <Button
                type="button"
                variant="primary_outline"
                onClick={handleLogout}
                button_text="Clear session"
              />
            ) : null}
          </div>
        </form>

        <aside className={styles.sideColumn}>
          <article className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.cardEyebrow}>Demo accounts</p>
                <h2>Use a mock credential set</h2>
              </div>
            </div>

            <div className={styles.accountList}>
              {demoAuthUsers.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  className={styles.accountButton}
                  onClick={() => applyDemoAccount(account)}
                >
                  <strong>{account.name}</strong>
                  <span>{account.email}</span>
                  <span>{account.role}</span>
                </button>
              ))}
            </div>
          </article>

          <article className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.cardEyebrow}>Current session</p>
                <h2>{session ? session.name : 'No active session'}</h2>
              </div>
            </div>

            {session ? (
              <dl className={styles.sessionDetails}>
                <div>
                  <dt>Email</dt>
                  <dd>{session.email}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{session.role}</dd>
                </div>
                <div>
                  <dt>Workspace</dt>
                  <dd>{session.workspace}</dd>
                </div>
                <div>
                  <dt>Mode</dt>
                  <dd>{session.mode}</dd>
                </div>
              </dl>
            ) : (
              <p className={styles.emptyState}>
                Sign in here, then inspect the shared shell and runtime signals to see how the
                persisted session behaves.
              </p>
            )}

            <NavLink className={styles.inlineLink} to="/observability">
              Inspect auth events in observability
            </NavLink>
          </article>
        </aside>
      </div>
    </section>
  );
};

export default LoginContainer;
