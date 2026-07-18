import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { MainPage } from "./pages/MainPage/MainPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { Layout } from "./layout/Layout";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage/ProductDetailsPage";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { authStore } from "./store/authStore";

const App: React.FC = observer(() => {
  useEffect(() => {
    authStore.checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="auth" element={<AuthPage />} />

          <Route
            path="profile"
            element={
              authStore.isAuth ? <ProfilePage /> : <Navigate to="/auth" replace />
            }
          />

          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

export default App;
