import { ForbiddenError } from 'apollo-server-express';
import { AdminResolver } from './admin.contract';
import { mockEmployees } from './admin.mock-data';
import { Employee } from '../admin.api-model';
import { authorizeToUser } from 'pods/security';

interface DB {
  employees: Employee[];
}

let db: DB = {
  employees: [...mockEmployees],
};

export const mockResolvers: AdminResolver = {
  Query: {
    employees: async (parent, args, context) => {
      return db.employees;
    },
    employee: async (parent, { id }, context) => {
      return db.employees.find((e) => e.id === id);
    },
  },
  Mutation: {
    deleteEmployee: async (parent, { id }) => {
      db = {
        ...db,
        employees: db.employees.filter((e) => e.id !== id),
      };
      return true;
    },
  },
};
