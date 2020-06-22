import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { logger } from './logger';

// Typings error: https://github.com/apollographql/react-apollo/issues/3854
export const logErrorGraphQLPlugin: any = {
  serverWillStart: async () => {
    logger.info('Server starting!');
  },
  requestDidStart: () => {
    return {
      didEncounterErrors: ({ request, response, errors }) => {
        const message = JSON.stringify({ request, response, errors });

        logger.error(message);
      },
    };
  },
} as ApolloServerPlugin;
