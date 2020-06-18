import { envConstants } from 'core/constants';
import { mockResolvers } from './admin.mock';
import { resolvers } from './admin.resolvers';

export const adminResolvers = envConstants.isApiMock
  ? mockResolvers
  : resolvers;
