import express, { Request, RequestHandler } from 'express';
import cookieparser from 'cookie-parser';
import { headerConstants, envConstants } from 'core/constants';

const buildHttpsUrl = (req: Request) =>
  `${headerConstants.httpsProtocol}://${req.header(headerConstants.host)}${
    req.url
  }`;

const redirectHttpsMiddleware: RequestHandler = (req, res, next) => {
  if (req.header(headerConstants.protocol) !== headerConstants.httpsProtocol) {
    res.redirect(buildHttpsUrl(req));
  } else {
    next();
  }
};

export const createApp = () => {
  const app = express();
  app.use(cookieparser());
  if (process.env.NODE_ENV === envConstants.production) {
    app.use(redirectHttpsMiddleware);
  }

  return app;
};
