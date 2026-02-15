import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/login/loginPage";
import SignupPage from "../pages/signup/signupPage";
import AnalyserPage from "../pages/analyser";
import CasesPage from "../pages/cases";
import AnalyticsPage from "../pages/analytics";
import AdminLayout from "../containers/layout/AdminLayout.jsx";

const publicRoutes = [
    { path: "/", component: LoginPage },
    { path: "/signup", component: SignupPage },
];

const privateRoutes = [
    { path: "/dashboard", component: AnalyserPage },
    { path: "/cases", component: CasesPage },
    { path: "/analytics", component: AnalyticsPage },
];

// Wrapper: redirects to /dashboard if already logged in
const PublicRoute = ({ children }) => {
    const auth = useSelector((state) => state.User?.auth);
    return auth?.token ? <Navigate to="/dashboard" replace /> : children;
};

// Wrapper: redirects to / (login) if not logged in
const PrivateRoute = ({ children }) => {
    const auth = useSelector((state) => state.User?.auth);
    return auth?.token ? children : <Navigate to="/" replace />;
};

const PagesRoute = () => {
    return (
        <Routes>
            {/* Public routes */}
            {publicRoutes.map(({ path, component: Component }, i) => (
                <Route
                    key={`public-${i}`}
                    path={path}
                    element={
                        <PublicRoute>
                            <Suspense fallback={<></>}>
                                <Component />
                            </Suspense>
                        </PublicRoute>
                    }
                />
            ))}

            {/* Private routes — wrapped in AdminLayout */}
            {privateRoutes.map(({ path, component: Component }, i) => (
                <Route
                    key={`private-${i}`}
                    path={path}
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <Suspense fallback={<></>}>
                                    <Component />
                                </Suspense>
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />
            ))}

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default PagesRoute;