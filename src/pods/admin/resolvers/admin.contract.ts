import { GraphQLResolver } from 'common/models';
import { Employee } from '../admin.api-model';

export interface AdminResolver {
  Query: {
    employees: GraphQLResolver<Employee[]>;
  };
}
