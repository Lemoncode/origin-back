import { SecurityResolver } from './security.contract';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import { mockUserProfiles } from './security.mock-data';
import { headerConstants } from 'core/constants';
import {
  formatToken,
  getGraphqlModuleSecret,
  getGraphqlModule,
} from '../security.helpers';
import { cookieOptions } from '../security.constants';
import { authorizeToUser } from '../security.authorization';
import { GraphqlContextUser } from 'common/models';

let userProfiles = [...mockUserProfiles];

export const mockResolvers: SecurityResolver = {
  Query: {
    authUser: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin', 'employee');

      return null;
    },
  },
  Mutation: {
    login: async (parent, { user, password }, context) => {
      const userProfile = userProfiles.find(
        (up) =>
          up.user.toLowerCase() === user.toLowerCase() &&
          up.password === password
      );

      if (userProfile) {
        const module = getGraphqlModule(context.req);
        const graphqlContextUser: GraphqlContextUser = {
          id: userProfile.id,
          firstname: userProfile.firstname,
          role: userProfile.role,
          module,
        };
        const secret = getGraphqlModuleSecret(context.req, userProfile.role);

        const token = jwt.sign(graphqlContextUser, secret, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        });
        const tokenWithBearer = formatToken(token);

        context.res.cookie(
          headerConstants.accessToken,
          tokenWithBearer,
          cookieOptions
        );

        // NOTE: We are sending token in body response due to we cannot access "Authorization" header in front side.
        return { userProfile, token: tokenWithBearer };
      } else {
        throw new UserInputError('Wrong user / passsword');
      }
    },
    logout: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin', 'employee');
      context.res.clearCookie(headerConstants.accessToken, cookieOptions);

      return true;
    },
    firstLoginChangePassword: async (parent, { password }, context) => {
      authorizeToUser(context.user, 'employee');

      userProfiles = userProfiles.map((up) =>
        up.id === context.user.id
          ? {
              ...up,
              password,
            }
          : up
      );

      // Unable to send null or void in Graphql
      // https://github.com/apollographql/graphql-tools/issues/277
      return true;
    },
    changePassword: async (
      parent,
      { currentPassword, newPassword },
      context
    ) => {
      authorizeToUser(context.user, 'employee');
      const userProfile = userProfiles.find(
        (up) => up.id === context.user.id && up.password === currentPassword
      );

      if (userProfile) {
        userProfiles = userProfiles.map((up) =>
          up.id === context.user.id
            ? {
                ...up,
                password: newPassword,
              }
            : up
        );
      } else {
        throw new UserInputError('Wrong user / passsword');
      }

      // Unable to send null or void in Graphql
      // https://github.com/apollographql/graphql-tools/issues/277
      return true;
    },
    resetPassword: async (parent, { userId, password }, context) => {
      authorizeToUser(context.user, 'admin');

      userProfiles = userProfiles.map((up) =>
        up.id === userId
          ? {
              ...up,
              password,
            }
          : up
      );

      // Unable to send null or void in Graphql
      // https://github.com/apollographql/graphql-tools/issues/277
      return true;
    },
  },
};
