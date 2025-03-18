import { FC, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import { ErrorsPage } from '../modules/errors/ErrorsPage';
import { Logout, AuthPage, useAuth } from '../modules/auth';
import { App } from '../App';

const { VITE_BASE_URL } = import.meta.env;


const AppRoutes: FC = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter basename={VITE_BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />

          {currentUser ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/catalogs" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
