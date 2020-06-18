import * as model from 'dals';
import * as apiModel from './security.api-model';
import * as commonModel from 'common/models';
import { Module } from 'common/models';

export const mapUserSecurityFromModelToApi = (
  userSecurity: model.UserSecurity
): apiModel.UserProfile => ({
  id: userSecurity._id,
  firstname: userSecurity.firstname,
  lastname: userSecurity.lastname,
  role: userSecurity.role,
  mustChangePassword: userSecurity.mustChangePassword,
});

export const mapUserSecurityToGraphqlContextUser = (
  userSecurity: model.UserSecurity,
  module: Module
): commonModel.GraphqlContextUser => ({
  id: userSecurity._id,
  firstname: userSecurity.firstname,
  role: userSecurity.role,
  module,
});

export const mapUserNameFromApiToModel = (userName: string): string =>
  userName?.toLowerCase();
