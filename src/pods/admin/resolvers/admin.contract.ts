import { GraphQLResolver } from 'common/models';
import { Employee } from '../admin.api-model';

export interface AdminResolver {
  Query: {
    employees: GraphQLResolver<Employee[]>;
    employee: GraphQLResolver<Employee, { id: string }>;
  };

  Mutation: {
    deleteEmployee: GraphQLResolver<boolean, { id: string }>;
  };
}
