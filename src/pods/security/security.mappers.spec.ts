import * as model from 'dals';
import {
  mapUserSecurityFromModelToApi,
  mapUserSecurityToGraphqlContextUser,
  mapUserNameFromApiToModel,
} from './security.mappers';
import { Module } from 'common/models';

describe('pods/security/security.mappers specs', () => {
  describe('mapUserSecurityFromModelToApi', () => {
    it('should throw exception when it feeds userSecurity equals undefined', () => {
      // Arrange
      const userSecurity: model.UserSecurity = undefined;

      // Act
      const result = () => mapUserSecurityFromModelToApi(userSecurity);

      // Assert
      expect(result).toThrowError();
    });

    it('should throw exception when it feeds userSecurity equals null', () => {
      // Arrange
      const userSecurity: model.UserSecurity = null;

      // Act
      const result = () => mapUserSecurityFromModelToApi(userSecurity);

      // Assert
      expect(result).toThrowError();
    });

    it('should return all undefined fields when it feeds userSecurity equals {}', () => {
      // Arrange
      const userSecurity: any = {};

      // Act
      const result = mapUserSecurityFromModelToApi(userSecurity);

      // Assert
      expect(result).toEqual({
        id: undefined,
        firstname: undefined,
        lastname: undefined,
        role: undefined,
        mustChangePassword: undefined,
      });
    });

    it('should return mapped user when it feeds userSecurity with values', () => {
      // Arrange
      const userSecurity: model.UserSecurity = {
        _id: 'test id',
        firstname: 'test firstname',
        lastname: 'test lastname',
        role: 'employee',
        mustChangePassword: true,
        userName: 'test userName',
        password: 'test password',
        salt: 'test salt',
      };

      // Act
      const result = mapUserSecurityFromModelToApi(userSecurity);

      // Assert
      expect(result).toEqual({
        id: 'test id',
        firstname: 'test firstname',
        lastname: 'test lastname',
        role: 'employee',
        mustChangePassword: true,
      });
    });
  });

  describe('mapUserSecurityToGraphqlContextUser', () => {
    it('should throw exception when it feeds userSecurity and module equals undefined', () => {
      // Arrange
      const userSecurity: model.UserSecurity = undefined;
      const module: Module = undefined;

      // Act
      const result = () =>
        mapUserSecurityToGraphqlContextUser(userSecurity, module);

      // Assert
      expect(result).toThrowError();
    });

    it('should throw exception when it feeds userSecurity and module equals null', () => {
      // Arrange
      const userSecurity: model.UserSecurity = null;
      const module: Module = null;

      // Act
      const result = () =>
        mapUserSecurityToGraphqlContextUser(userSecurity, module);

      // Assert
      expect(result).toThrowError();
    });

    it('should return all undefined fields when it feeds userSecurity equals {} and module with value', () => {
      // Arrange
      const userSecurity: any = {};
      const module: Module = 'admin';

      // Act
      const result = mapUserSecurityToGraphqlContextUser(userSecurity, module);

      // Assert
      expect(result).toEqual({
        id: undefined,
        firstname: undefined,
        role: undefined,
        module: 'admin',
      });
    });

    it('should return mapped user when it feeds userSecurity and module with values', () => {
      // Arrange
      const userSecurity: model.UserSecurity = {
        _id: 'test id',
        firstname: 'test firstname',
        lastname: 'test lastname',
        role: 'employee',
        mustChangePassword: true,
        userName: 'test userName',
        password: 'test password',
        salt: 'test salt',
      };
      const module: Module = 'employee';

      // Act
      const result = mapUserSecurityToGraphqlContextUser(userSecurity, module);

      // Assert
      expect(result).toEqual({
        id: 'test id',
        firstname: 'test firstname',
        role: 'employee',
        module: 'employee',
      });
    });
  });

  describe('mapUserNameFromApiToModel', () => {
    it('should return undefined when it feeds userName equals undefined', () => {
      // Arrange
      const userName: string = undefined;

      // Act
      const result = mapUserNameFromApiToModel(userName);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds userName equals null', () => {
      // Arrange
      const userName: string = null;

      // Act
      const result = mapUserNameFromApiToModel(userName);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return empty string when it feeds userName equals empty string', () => {
      // Arrange
      const userName: string = '';

      // Act
      const result = mapUserNameFromApiToModel(userName);

      // Assert
      expect(result).toEqual('');
    });

    it('should return same string when it feeds userName with lower case', () => {
      // Arrange
      const userName: string = 'test username';

      // Act
      const result = mapUserNameFromApiToModel(userName);

      // Assert
      expect(result).toEqual('test username');
    });

    it('should return lower case string when it feeds userName with capital letters', () => {
      // Arrange
      const userName: string = 'teST userName';

      // Act
      const result = mapUserNameFromApiToModel(userName);

      // Assert
      expect(result).toEqual('test username');
    });
  });
});
