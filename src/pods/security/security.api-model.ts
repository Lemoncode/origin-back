import { Role } from 'common/models';

export interface UserProfile {
  id: string;
  firstname: string;
  lastname: string;
  role: Role;
  mustChangePassword?: boolean;
}

export interface LoginResponse {
  userProfile: UserProfile;
  token: string;
}
