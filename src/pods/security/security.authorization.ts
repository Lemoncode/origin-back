import * as commonTypes from 'common/models';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

// TODO: Move to Graphql custom directives?
// https://www.apollographql.com/docs/apollo-server/security/authentication/#authorization-via-custom-directives

export const authorizeToUser = (
  user: commonTypes.GraphqlContextUser,
  ...roles: commonTypes.Role[]
) => {
  if (!isAuthenticated(user)) {
    throw new AuthenticationError('You must be logged in');
  }

  if (!isAuthorized(user, roles)) {
    throw new ForbiddenError(`You don't have permission`);
  }
};

const isAuthenticated = (user: commonTypes.GraphqlContextUser): boolean =>
  Boolean(user);

const isAuthorized = (
  user: commonTypes.GraphqlContextUser,
  roles: commonTypes.Role[]
) => roles.some(role => role === user.role);
