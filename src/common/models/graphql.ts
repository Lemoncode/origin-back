import { Request, Response } from 'express';
import { Role } from './role';
import { IGraphQLToolsResolveInfo } from 'apollo-server-express';
import { Module } from './module';

// We could add more specific types when we need it.
// https://graphql.org/learn/execution/#root-fields-resolvers
// https://www.apollographql.com/docs/tutorial/resolvers/#what-is-a-resolver

export interface GraphqlContextUser {
  id: string;
  firstname: string;
  role: Role;
  module: Module;
}

export interface Context {
  req: Request;
  res: Response;
  user: GraphqlContextUser;
}

export type GraphQLResolver<ReturnedType, Args = {}> = (
  rootObject: any,
  args: Args,
  context: Context,
  info: IGraphQLToolsResolveInfo
) => Promise<ReturnedType>;
