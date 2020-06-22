import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import { SecurityResolver } from './security.contract';
import {
  getUserSecurityByNameAndPassword,
  updatePassword,
  UserSecurity,
  getUser,
  getUserSecurityById,
} from 'dals';
import {
  formatToken,
  getGraphqlModuleSecret,
  getGraphqlModule,
  extractAuthTokenFromCookies,
  extractAuthTokenFromHeaders,
} from '../security.helpers';
import { headerConstants } from 'core/constants';
import { cookieOptions } from '../security.constants';
import {
  mapUserSecurityToGraphqlContextUser,
  mapUserSecurityFromModelToApi,
  mapUserNameFromApiToModel,
} from '../security.mappers';
import { authorizeToUser } from '../security.authorization';
import {
  generateSalt,
  buildHashedPassword,
} from 'common/helpers/hash-password.helpers';

const handleChangePasswordResolver = async (
  userId: string,
  password: string,
  mustChangePassword: boolean
) => {
  const salt = generateSalt();
  const newPassword = await buildHashedPassword(password, salt);
  const userSecurity: Partial<UserSecurity> = {
    _id: userId,
    password: newPassword,
    salt,
    mustChangePassword,
  };
  return await updatePassword(userSecurity);
};

export const resolvers: SecurityResolver = {
  Query: {
    authUser: async (parent, args, context) => {
      authorizeToUser(context.user, 'admin', 'employee');
      const userSecurity = await getUserSecurityById(context.user.id, {
        'userSecurity._id': 1,
        'userSecurity.firstname': 1,
        'userSecurity.lastname': 1,
        'userSecurity.role': 1,
        'userSecurity.mustChangePassword': 1,
      });
      const userProfile = mapUserSecurityFromModelToApi(userSecurity);

      const token =
        extractAuthTokenFromCookies(context.req) ||
        extractAuthTokenFromHeaders(context.req);
      return { userProfile, token };
    },
  },
  Mutation: {
    login: async (parent, { user, password }, context) => {
      const userSecurity = await getUserSecurityByNameAndPassword(
        mapUserNameFromApiToModel(user),
        password,
        {
          'userSecurity._id': 1,
          'userSecurity.firstname': 1,
          'userSecurity.lastname': 1,
          'userSecurity.role': 1,
          'userSecurity.mustChangePassword': 1,
        }
      );

      if (userSecurity) {
        const module = getGraphqlModule(context.req);
        const graphqlContextUser = mapUserSecurityToGraphqlContextUser(
          userSecurity,
          module
        );
        const secret = getGraphqlModuleSecret(context.req, userSecurity.role);

        const token = jwt.sign(graphqlContextUser, secret, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        });
        const tokenWithBearer = formatToken(token);

        context.res.cookie(
          headerConstants.accessToken,
          tokenWithBearer,
          cookieOptions
        );

        const userProfile = mapUserSecurityFromModelToApi(userSecurity);

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

      return await handleChangePasswordResolver(
        context.user.id,
        password,
        false
      );
    },
    changePassword: async (
      parent,
      { currentPassword, newPassword },
      context
    ) => {
      authorizeToUser(context.user, 'employee');
      const user = await getUser(context.user.id, context.user.role, {
        'userSecurity.userName': 1,
      });

      const userName = user.userSecurity.userName;
      const userSecurity = await getUserSecurityByNameAndPassword(
        mapUserNameFromApiToModel(userName),
        currentPassword,
        {
          'userSecurity._id': 1,
        }
      );

      if (userSecurity) {
        return await handleChangePasswordResolver(
          context.user.id,
          newPassword,
          false
        );
      } else {
        throw new UserInputError('Wrong user / passsword');
      }
    },
    resetPassword: async (parent, { userId, password }, context) => {
      authorizeToUser(context.user, 'admin');

      return await handleChangePasswordResolver(userId, password, true);
    },
  },
};
