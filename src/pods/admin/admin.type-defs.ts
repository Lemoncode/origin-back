import { gql } from 'apollo-server-express';

export const adminTypeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    isActive: Boolean!
    email: String!
    lastDateIncurred: String
    projects: [EmployeeProject!]
  }

  type EmployeeProject {
    id: ID!
    isAssigned: Boolean!
  }

  type Project {
    id: ID!
    name: String!
    code: String!
    externalId: String
    comments: String
    isActive: Boolean!
    lastDateIncurred: String
    creationDate: String!
    employees: [ProjectEmployee!]
  }

  type ProjectEmployee {
    id: ID!
    isAssigned: Boolean!
  }

  extend type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee!
    projects: [Project!]!
    project(id: ID!): Project!
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
  }

  input ProjectInput {
    id: ID
    name: String!
    externalId: String
    comments: String
    isActive: Boolean
  }

  input ProjectEmployeeInput {
    id: ID!
    isAssigned: Boolean!
  }

  extend type Mutation {
    deleteEmployee(id: ID!): Boolean!
    saveEmployee(employee: EmployeeInput!): Employee!
    saveEmployeeProjectList(
      id: ID!
      employeeProjectList: [EmployeeProjectInput!]!
    ): [EmployeeProject!]!
    deleteProject(id: ID!): Boolean!
    saveProject(project: ProjectInput!): Project!
    saveProjectEmployeeList(
      id: ID!
      projectEmployeeList: [ProjectEmployeeInput!]!
    ): [ProjectEmployee!]!
  }
`;
