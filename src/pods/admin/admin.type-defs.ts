import { gql } from 'apollo-server-express';

export const adminTypeDefs = gql`
  type Employee {
    id: ID!
    name: String!
  }

  extend type Query {
    employees: [Employee!]!
  }
`;
