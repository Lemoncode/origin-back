import { UserContext } from './user.context';
import { User, UserSecurity } from './user.model';
import { SelectedFields, Role } from 'common/models';
import {
  findOneAndUpsert,
  omitSubdocumentUndefined,
} from 'core/database/database.helpers';
import { Types } from 'mongoose';
import { buildHashedPassword } from 'common/helpers/hash-password.helpers';

export const getUser = async (
  id: string,
  role: Role,
  fields: SelectedFields<User>
): Promise<User> =>
  await UserContext.findOne({
    _id: id,
    'userSecurity.role': role,
  })
    .select(fields)
    .lean();

export const getUserSecurityById = async (
  id: string,
  fields: SelectedFields<User>
): Promise<UserSecurity> => {
  const user: User = await UserContext.findOne({
    _id: id,
  })
    .select({
      ...fields,
    })
    .lean();

  return user.userSecurity;
};

export const getUserSecurityByNameAndPassword = async (
  userName: string,
  password: string,
  fields: SelectedFields<User>
): Promise<UserSecurity> => {
  const user: User = await UserContext.findOne({
    'userSecurity.userName': userName,
  })
    .select({
      ...fields,
      'userSecurity.password': 1,
      'userSecurity.salt': 1,
    })
    .lean();

  if (user && user.userSecurity) {
    const { password: currentPassword, salt, ...rest } = user.userSecurity;

    const hasValidCredentials = await verifyCredentials(
      password,
      currentPassword,
      salt
    );

    return hasValidCredentials ? (rest as UserSecurity) : null;
  }
};

const verifyCredentials = async (
  password: string,
  currentPassword: string,
  salt: string
) => {
  const hashedPassword = await buildHashedPassword(password, salt);

  return hashedPassword === currentPassword;
};

export const saveUser = async (user: User): Promise<User> => {
  const userToUpsert = await omitSubdocumentUndefined(user, 'userSecurity');

  return await findOneAndUpsert(
    UserContext,
    {
      _id: user._id,
    },
    userToUpsert,
    {
      fields: {
        _id: 1,
        'userSecurity.firstname': 1,
        'userSecurity.lastname': 1,
        email: 1,
      },
    }
  );
};

export const updatePassword = async (
  userSecurity: Partial<UserSecurity>
): Promise<boolean> => {
  const result = await UserContext.findOneAndUpdate(
    {
      _id: userSecurity._id,
    },
    {
      'userSecurity.password': userSecurity.password,
      'userSecurity.salt': userSecurity.salt,
      'userSecurity.mustChangePassword': userSecurity.mustChangePassword,
    },
    {
      new: true,
      fields: {
        _id: 1,
      },
    }
  ).lean();

  return Boolean(result);
};
