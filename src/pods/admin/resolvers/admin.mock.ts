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
    saveEmployee: async (parent, { employee }) => {
      const existEmployee = db.employees.some((e) => e.id === employee.id);

      return existEmployee
        ? updateEmployee(employee)
        : insertEmployee(employee);
    },
    saveProjectSummaryList: async (parent, { id, projectSummaryList }) => {
      const currentEmployee = db.employees.find((e) => e.id === id);
      const projectIds = projectSummaryList.map((psl) => psl.id);
      const projects = db.employees.filter((e) =>
        projectIds.some((id) => id.includes(e.id))
      );

      const mappedProjectSummaryList = projectSummaryList.map((psl) => ({
        id: psl.id,
        isAssigned: psl.isAssigned,
        projectName: psl.projectName,
      }));

      const employee: Employee = {
        ...currentEmployee,
        projects: mappedProjectSummaryList,
      };

      updateEmployee(employee);

      return mappedProjectSummaryList;
    },
  },
};

const updateEmployee = (employee: Employee) => {
  db = {
    ...db,
    employees: db.employees.map((e) =>
      e.id === employee.id ? { ...employee } : e
    ),
  };

  return employee;
};

const insertEmployee = (employee: Employee) => {
  const lastIndex = db.employees.length - 1;
  const lastId = Number(db.employees[lastIndex].id);
  const currentDate = new Date();
  const lastDateIncurred = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;

  const newEmployee = {
    ...employee,
    id: (lastId + 1).toString(),
    lastDateIncurred,
  };
  db = {
    ...db,
    employees: [...db.employees, newEmployee],
  };

  return newEmployee;
};
