import merge from 'lodash.merge';
import express from 'express';
import path from 'path';
import { createApp, createGraphqlServer } from 'core/servers';
import { logger } from 'common/logger';
import { typeDefs, coreResolvers } from 'core/graphql';
import { connectToDB } from 'core/database';
import { adminTypeDefs, adminResolvers } from 'pods/admin';
import {
  securityTypeDefs,
  securityResolvers,
  getAuthAdminUser,
  getAuthEmployeeUser,
} from 'pods/security';
import { envConstants, graphqlRouteConstants } from 'core/constants';
import { logErrorRequestMiddleware } from 'common/logger';

const app = createApp();

const employeeServer = createGraphqlServer(app, {
  path: graphqlRouteConstants.employeeModule,
  typeDefs: [typeDefs, securityTypeDefs],
  resolvers: merge(coreResolvers, securityResolvers),
  context: async ({ req, res }) => ({
    req,
    res,
    user: await getAuthEmployeeUser(req),
  }),
});

const adminServer = createGraphqlServer(app, {
  path: graphqlRouteConstants.adminModule,
  typeDefs: [typeDefs, adminTypeDefs, securityTypeDefs],
  resolvers: merge(adminResolvers, coreResolvers, securityResolvers),
  context: async ({ req, res }) => ({
    req,
    res,
    user: await getAuthAdminUser(req),
  }),
});

const originFrontEmployeePublicPath = path.resolve(
  __dirname,
  process.env.ORIGIN_FRONT_EMPLOYEE_STATIC_FILES
);

const originFrontAdminPublicPath = path.resolve(
  __dirname,
  process.env.ORIGIN_FRONT_ADMIN_STATIC_FILES
);
app.use('/', express.static(originFrontEmployeePublicPath));
app.use('/admin', express.static(originFrontAdminPublicPath));

app.use(logErrorRequestMiddleware);

app.listen(process.env.PORT, async () => {
  if (!envConstants.isApiMock) {
    await connectToDB(process.env.MONGODB_URI);
  } else {
    logger.info('Running API mock');
  }
  logger.info(
    `Employee server ready at http://localhost:${process.env.PORT}${employeeServer.graphqlPath}`
  );
  logger.info(
    `Admin server ready at http://localhost:${process.env.PORT}${adminServer.graphqlPath}`
  );
});
