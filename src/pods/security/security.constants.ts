import { CookieOptions } from 'express';
import { envConstants } from 'core/constants';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === envConstants.production,
};
