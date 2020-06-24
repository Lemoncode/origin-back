import { gql } from 'apollo-server-express';

export const adminTypeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    isActive: Boolean!
    email: String!
    lastDateIncurred: String!
    projects: [EmployeeProject!]
  }

  type EmployeeProject {
    id: ID!
    isAssigned: Boolean!
  }

  type Project {
    id: ID!
    name: String!
    isActive: Boolean
  }

  extend type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee!
    projects: [Project!]!
  }

  input EmployeeProjectInput {
    id: ID!
    isAssigned: Boolean!
  }

  input EmployeeInput {
    id: ID
    name: String!
    isActive: Boolean!
    email: String!
    lastDateIncurred: String
    temporalPassword: String
    projects: [EmployeeProjectInput!]
  }

  extend type Mutation {
    deleteEmployee(id: ID!): Boolean!
    saveEmployee(employee: EmployeeInput!): Employee!
    saveEmployeeProjectList(
      id: ID!
      employeeProjectList: [EmployeeProjectInput!]!
    ): [EmployeeProject!]!
  }
`;
