import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';
import { getCurrentUser } from '../services/authService';
import { Roles } from '../models/role';

function PrivateRoute({ children, roles }: { children: React.ReactNode, roles?: string[] }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/401" />;
  return children;
}

const AppRouter = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={
        <PrivateRoute roles={[Roles.ADMIN, Roles.USER]}>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="/admin" element={
        <PrivateRoute roles={[Roles.ADMIN]}>
          <Admin />
        </PrivateRoute>
      } />
      <Route path="/401" element={<Unauthorized />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
