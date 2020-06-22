import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import { Express } from 'express';
import { logErrorGraphQLPlugin } from 'common/logger';

interface ApolloConfig extends ApolloServerExpressConfig {
  path?: string;
}

export const createGraphqlServer = (
  app: Express,
  apolloConfig: ApolloConfig
): ApolloServer => {
  const { path, plugins = [], ...config } = apolloConfig;

  const server = new ApolloServer({
    ...config,
    plugins: [...plugins, logErrorGraphQLPlugin],
  });
  server.applyMiddleware({ app, path });
  return server;
};
