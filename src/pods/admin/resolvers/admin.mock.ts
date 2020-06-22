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
  },
};
