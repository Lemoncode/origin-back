import { gql } from 'apollo-server-express';

export const adminTypeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    isActive: Boolean!
    email: String!
    lastDateIncurred: String!
  }

  extend type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee!
  }

  input EmployeeInput {
    id: ID
    name: String!
    isActive: Boolean!
    email: String!
    lastDateIncurred: String
    temporalPassword: String!
  }

  extend type Mutation {
    deleteEmployee(id: ID!): Boolean!
    saveEmployee(employee: EmployeeInput!): Employee!
  }
`;
