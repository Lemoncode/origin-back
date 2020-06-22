import { AdminResolver } from './admin.contract';
import { Employee } from '../admin.api-model';
import { authorizeToUser } from 'pods/security';

export const resolvers: AdminResolver = {
  Query: {
    employees: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin');
      return null;
    },
  },
};
