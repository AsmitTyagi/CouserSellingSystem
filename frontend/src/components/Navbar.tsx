import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import type { Role } from '../models/role';
import { Roles } from '../models/role';

const Navbar: React.FC = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="/home" className="navbar-brand ms-1">
        <img width={40} alt="Course Logo" src="/favicon.ico" />
        Apna Course Platform
      </Link>
      <div className="navbar-nav me-auto">
        {user?.role === Roles.ADMIN && (
          <div className="nav-item">
            <Link to="/admin" className="nav-link">Admin</Link>
          </div>
        )}
        <div className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </div>
      </div>
      {!user?.id ? (
        <div className="navbar-nav ms-auto">
          <div className="nav-item">
            <Link to="/register" className="nav-link">Sign Up</Link>
          </div>
          <div className="nav-item">
            <Link to="/login" className="nav-link">Sign In</Link>
          </div>
        </div>
      ) : (
        <div className="navbar-nav ms-auto">
          <div className="nav-item">
            <Link to="/profile" className="nav-link">{user.username}</Link>
          </div>
          <div className="nav-item">
            <span className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>Sign Out</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
