import type { Role } from './role';

export interface User {
  id?: number;
  username: string;
  password: string;
  name: string;
  token?: string;
  role: Role;
}
