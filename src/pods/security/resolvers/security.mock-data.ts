import { UserProfile } from '../security.api-model';

export interface MockUserProfile extends UserProfile {
  user: string;
  password: string;
}

export const mockUserProfiles: MockUserProfile[] = [
  {
    id: '1',
    user: 'employee1',
    password: 'test',
    firstname: 'Employee 1',
    lastname: 'One',
    role: 'employee',
    mustChangePassword: false,
  },
  {
    id: '2',
    user: 'admin',
    password: 'test',
    firstname: 'Admin',
    lastname: 'Admin user',
    role: 'admin',
  },
];
