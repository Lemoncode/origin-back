import { ObjectId, Role } from 'common/models';

export interface User {
  _id: ObjectId;
  userSecurity: UserSecurity;
  email: string;
}

export interface UserSecurity {
  _id: ObjectId;
  userName: string;
  password: string;
  salt: string;
  firstname: string;
  lastname: string;
  role: Role;
  mustChangePassword?: boolean;
  isActive?: boolean;
}
