import { api } from './api';

const USER_URL = '/api/user';

export async function changeRole(newRole: string) {
  return api.put(`${USER_URL}/change/${newRole}`, {});
}
