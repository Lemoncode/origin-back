import { AdminResolver } from './admin.contract';
import { Employee } from '../admin.api-model';
import { authorizeToUser } from 'pods/security';

export const resolvers: AdminResolver = {
  Query: {
    employees: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin');
      return null;
    },
    employee: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin');
      return null;
    },
    projects: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin');
      return null;
    },
  },
  Mutation: {
    deleteEmployee: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin');
      return null;
    },
    saveEmployee: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin');
      return null;
    },
    saveEmployeeProjectList: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin');
      return null;
    },
    saveProject: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin');
      return null;
    },
    saveProjectEmployeeList: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin');
      return null;
    },
  },
};
