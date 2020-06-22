import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  scalar Date

  type Lookup {
    id: ID!
    name: String!
  }

  input LookupInput {
    id: ID!
    name: String!
  }
`;
