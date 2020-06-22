import { GraphQLResolver } from 'common/models';
import { LoginResponse } from '../security.api-model';

export interface SecurityResolver {
  Query: {
    authUser: GraphQLResolver<LoginResponse>;
  };
  Mutation: {
    login: GraphQLResolver<LoginResponse, { user: string; password: string }>;
    logout: GraphQLResolver<boolean>;
    firstLoginChangePassword: GraphQLResolver<boolean, { password: string }>;
    changePassword: GraphQLResolver<
      boolean,
      { currentPassword: string; newPassword: string }
    >;
    resetPassword: GraphQLResolver<
      boolean,
      { userId: string; password: string }
    >;
  };
}
