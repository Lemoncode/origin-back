import { ErrorRequestHandler } from 'express';
import { logger } from './logger';

export const logErrorRequestMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  logger.error({
    error,
    path: req.path,
  });
  next();
};
