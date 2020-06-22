import { envConstants } from 'core/constants';
import { mockResolvers } from './security.mock';
import { resolvers } from './security.resolvers';

export const securityResolvers = envConstants.isApiMock ? mockResolvers : resolvers;
