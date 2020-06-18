import { Request } from 'express';
import { headerConstants, graphqlRouteConstants } from 'core/constants';
import { Role, Module, GraphqlContextUser } from 'common/models';

export const extractAuthTokenFromCookies = (req: Request) =>
  extractAuthToken(req.cookies);

export const extractAuthTokenFromHeaders = (req: Request) =>
  extractAuthToken(req.headers);

const extractAuthToken = (keys): string => {
  const tokenWithBearer = keys ? keys[headerConstants.accessToken] : '';

  const [, token] = tokenWithBearer?.split(`${headerConstants.bearer} `) || [];

  return token;
};

export const formatToken = (token: string): string =>
  Boolean(token) ? `${headerConstants.bearer} ${token}` : null;

const isGraphqlEmployeeModule = (req: Request, role: Role) =>
  req.baseUrl === graphqlRouteConstants.employeeModule && role === 'employee';

const isGraphqlAdminModule = (req: Request, role: Role) =>
  req.baseUrl === graphqlRouteConstants.adminModule && role === 'admin';

export const getGraphqlModuleSecret = (req: Request, role: Role): string => {
  if (isGraphqlEmployeeModule(req, role)) {
    return process.env.EMPLOYEE_AUTH_SECRET;
  } else if (isGraphqlAdminModule(req, role)) {
    return process.env.ADMIN_AUTH_SECRET;
  }
};

export const getGraphqlModule = (req: Request): Module => {
  if (req.baseUrl === graphqlRouteConstants.adminModule) {
    return 'admin';
  } else if (req.baseUrl === graphqlRouteConstants.employeeModule) {
    return 'employee';
  }
};
