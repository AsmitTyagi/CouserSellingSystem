import { api, setAuthToken } from './api';
import type { User } from '../models/user';

const AUTH_URL = '/api/authentication';

export async function login(user: User) {
  const response = await api.post(`${AUTH_URL}/sign-in`, user);
  if (response.data?.token) {
    setAuthToken(response.data.token);
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    console.log('JWT token set in Axios:', response.data.token);
    console.log('Axios default Authorization:', api.defaults.headers.common['Authorization']);
  }
  return response.data;
}

export async function register(user: User) {
  return api.post(`${AUTH_URL}/sign-up`, user);
}

export function logout() {
  localStorage.removeItem('currentUser');
  setAuthToken();
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('currentUser');
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) {
      setAuthToken(user.token);
    }
    return user;
  }
  return null;
}
