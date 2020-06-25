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

      const employee: Employee = {
        ...currentEmployee,
        projects: employeeProjectList,
      };

      updateEmployee(employee);

      return employeeProjectList;
    },
    saveProject: async (parent, { project }) => {
      const existProject = db.employees.some((e) => e.id === project.id);

      return existProject ? updateProject(project) : insertProject(project);
    },
    saveProjectEmployeeList: async (parent, { id, projectEmployeeList }) => {
      const currentProject = db.projects.find((p) => p.id === id);

      const project: Project = {
        ...currentProject,
        employees: projectEmployeeList,
      };

      updateProject(project);

      return projectEmployeeList;
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

const updateProject = (project: Project) => {
  db = {
    ...db,
    projects: db.projects.map((p) =>
      p.id === project.id ? { ...p, ...project } : p
    ),
  };

  return project;
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

const insertProject = (project: Project) => {
  const lastIndex = db.projects.length - 1;
  const lastId = Number(db.projects[lastIndex].id);

  const newProject = {
    ...project,
    id: (lastId + 1).toString(),
  };
  db = {
    ...db,
    projects: [...db.projects, newProject],
  };

  return newProject;
};
