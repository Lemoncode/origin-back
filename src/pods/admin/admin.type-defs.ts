import { gql } from 'apollo-server-express';

export const adminTypeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    isActive: Boolean!
    email: String!
    lastDateIncurred: String!
    projects: [ProjectSummary!]
  }

  type ProjectSummary {
    id: ID!
    isAssigned: Boolean!
    projectName: String!
  }

  extend type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee!
  }

  input ProjectSummaryInput {
    id: ID!
    isAssigned: Boolean!
    projectName: String!
  }

  input EmployeeInput {
    id: ID
    name: String!
    isActive: Boolean!
    email: String!
    lastDateIncurred: String
    temporalPassword: String
    projects: [ProjectSummaryInput!]
  }

  extend type Mutation {
    deleteEmployee(id: ID!): Boolean!
    saveEmployee(employee: EmployeeInput!): Employee!
    saveProjectSummaryList(
      id: ID!
      projectSummaryList: [ProjectSummaryInput!]!
    ): [ProjectSummary!]!
  }
`;
