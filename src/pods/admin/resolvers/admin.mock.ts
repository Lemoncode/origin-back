import { ForbiddenError } from 'apollo-server-express';
import { AdminResolver } from './admin.contract';
import { mockEmployees, mockProjects } from './admin.mock-data';
import { Employee, Project } from '../admin.api-model';
import { authorizeToUser } from 'pods/security';

interface DB {
  employees: Employee[];
  projects: Project[];
}

let db: DB = {
  employees: [...mockEmployees],
  projects: [...mockProjects],
};

export const mockResolvers: AdminResolver = {
  Query: {
    employees: async (parent, args, context) => {
      return db.employees;
    },
    employee: async (parent, { id }, context) => {
      return db.employees.find((e) => e.id === id);
    },
    projects: async (parent, args, context) => {
      return db.projects;
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
    saveEmployeeProjectList: async (parent, { id, employeeProjectList }) => {
      const currentEmployee = db.employees.find((e) => e.id === id);
      const projectIds = employeeProjectList.map((psl) => psl.id);
      const projects = db.employees.filter((e) =>
        projectIds.some((id) => id.includes(e.id))
      );

      const mappedEmployeeProjectList = employeeProjectList.map((psl) => ({
        id: psl.id,
        isAssigned: psl.isAssigned,
      }));

      const employee: Employee = {
        ...currentEmployee,
        projects: mappedEmployeeProjectList,
      };

      updateEmployee(employee);

      return mappedEmployeeProjectList;
    },
  },
};

const updateEmployee = (employee: Employee) => {
  db = {
    ...db,
    employees: db.employees.map((e) =>
      e.id === employee.id ? { ...e, ...employee } : e
    ),
  };

  return employee;
};

const insertEmployee = (employee: Employee) => {
  const lastIndex = db.employees.length - 1;
  const lastId = Number(db.employees[lastIndex].id);

  const newEmployee = {
    ...employee,
    id: (lastId + 1).toString(),
  };
  db = {
    ...db,
    employees: [...db.employees, newEmployee],
  };

  return newEmployee;
};
