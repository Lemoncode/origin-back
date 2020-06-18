import { gql } from 'apollo-server-express';

export const securityTypeDefs = gql`
  type UserProfile {
    firstname: String!
    lastname: String!
    role: String!
    mustChangePassword: Boolean
  }

  type LoginResponse {
    userProfile: UserProfile!
    token: String!
  }

  extend type Query {
    authUser: LoginResponse!
  }

  extend type Mutation {
    login(user: String!, password: String!): LoginResponse!
    logout: Boolean
    firstLoginChangePassword(password: String!): Boolean
    changePassword(currentPassword: String!, newPassword: String!): Boolean
    resetPassword(userId: ID!, password: String!): Boolean
  }
`;
