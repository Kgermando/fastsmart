
// export interface User {
//     uid: string;
//     email: string;
//     photoURL?: string;
//     displayName?: string;
//     adress?: string;
//     phone?: string;
//     roles: Roles;
//     updateDate?: Date,
//     emailVerified: boolean;
// }

import { Permissions, Roles } from './permissions.model';
export interface User {
  uid: string;
  name: string;
  email: string;
  adress?: string;
  phone?: string;
  roles: Roles;
}

export class RegisterRequest {
  constructor() {}
  email = '';
  password = '';
  name: string;
  adress?: string;
  phone?: string;
  role: Permissions;
}

export class LoginRequest {
  constructor() {}
  email = '';
  password = '';
}
  