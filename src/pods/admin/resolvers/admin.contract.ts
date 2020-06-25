import { GraphQLResolver } from 'common/models';
import {
  Employee,
  EmployeeProject,
  Project,
  ProjectEmployee,
} from '../admin.api-model';

export interface AdminResolver {
  Query: {
    employees: GraphQLResolver<Employee[]>;
    employee: GraphQLResolver<Employee, { id: string }>;
    projects: GraphQLResolver<Project[]>;
  };

  Mutation: {
    deleteEmployee: GraphQLResolver<boolean, { id: string }>;
    saveEmployee: GraphQLResolver<Employee, { employee: Employee }>;
    saveEmployeeProjectList: GraphQLResolver<
      EmployeeProject[],
      { id: string; employeeProjectList: EmployeeProject[] }
    >;
    saveProject: GraphQLResolver<Project, { project: Project }>;
    saveProjectEmployeeList: GraphQLResolver<
      ProjectEmployee[],
      { id: string; projectEmployeeList: ProjectEmployee[] }
    >;
  };
}
