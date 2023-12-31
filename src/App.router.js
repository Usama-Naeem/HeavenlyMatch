import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import AdminSignin from './pages/AdminSignin/AdminSigninForm';
// import AdminSigninNew from './pages/AdminSignin/AdminSigninForm';
import PersistedRoutes from './routes/PersistedRoute';
import PrivateRoute from './routes/PrivateRoute';
import { DASHBOARD, ADMIN_SIGNIN, ADMIN_SIGNIN_NEW } from './constant/pageRoutes';
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Persisted Routes  */}
        <Route element={<PersistedRoutes />}>
          <Route path={ADMIN_SIGNIN} element={<AdminSignin />} />
          {/* <Route path={ADMIN_SIGNIN_NEW} element={<AdminSigninNew />} /> */}
        </Route>

        {/* Protected Routes */}
        <Route
          path={DASHBOARD}
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/*" element={<Navigate to={ADMIN_SIGNIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
