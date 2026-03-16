import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from '../containers/layout/appShell';
import { routeCatalog } from './routeCatalog';

const pageModules = {
  showcase: lazy(() => import('../pages/showcase')),
  todos: lazy(() => import('../pages/todos')),
  login: lazy(() => import('../pages/login')),
  observability: lazy(() => import('../pages/observability')),
};

const PagesRoute = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        {routeCatalog.map((route) => {
          const PageComponent = pageModules[route.id];

          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                <Suspense fallback={<div />}>
                  <PageComponent />
                </Suspense>
              }
            />
          );
        })}
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default PagesRoute;
