import { GraphQLResolver } from 'common/models';
import { Employee, ProjectSummary } from '../admin.api-model';

export interface AdminResolver {
  Query: {
    employees: GraphQLResolver<Employee[]>;
    employee: GraphQLResolver<Employee, { id: string }>;
  };

  Mutation: {
    deleteEmployee: GraphQLResolver<boolean, { id: string }>;
    saveEmployee: GraphQLResolver<Employee, { employee: Employee }>;
    saveProjectSummaryList: GraphQLResolver<
      ProjectSummary[],
      { id: string; projectSummaryList: ProjectSummary[] }
    >;
  };
}
