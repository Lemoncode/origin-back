import { Request } from 'express';
import jwt from 'jsonwebtoken';
import {
  extractAuthTokenFromCookies,
  extractAuthTokenFromHeaders,
} from './security.helpers';

export const getAuthAdminUser = async (req: Request) => {
  const token =
    extractAuthTokenFromCookies(req) || extractAuthTokenFromHeaders(req);
  return await getUser(token, process.env.ADMIN_AUTH_SECRET);
};

export const getAuthEmployeeUser = async (req: Request) => {
  const token =
    extractAuthTokenFromCookies(req) || extractAuthTokenFromHeaders(req);
  return getUser(token, process.env.EMPLOYEE_AUTH_SECRET);
};

const getUser = (token: string, secret: string) =>
  new Promise((resolve) => {
    jwt.verify(token, secret, (error, user) =>
      error ? resolve(null) : resolve(user)
    );
  });
