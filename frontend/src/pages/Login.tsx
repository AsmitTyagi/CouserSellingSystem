import React, { useState } from 'react';
import { Roles } from '../models/role';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password, name: '', role: Roles.USER });
      navigate('/profile');
    } catch {
      setErrorMessage('Username or password is incorrect.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-danger w-100 mt-3">Sign In</button>
        </form>
        <button className="btn btn-link" style={{ color: 'darkgray' }} onClick={() => navigate('/register')}>Create new account!</button>
      </div>
    </div>
  );
};

export default Login;
