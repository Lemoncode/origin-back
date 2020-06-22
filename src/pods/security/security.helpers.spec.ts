import { Request } from 'express';
import { headerConstants, graphqlRouteConstants } from 'core/constants';
import {
  extractAuthTokenFromHeaders,
  extractAuthTokenFromCookies,
  formatToken,
  getGraphqlModuleSecret,
  getGraphqlModule,
} from './security.helpers';
import { Role, GraphqlContextUser } from 'common/models';

describe('security/security.helpers specs', () => {
  describe('extractAuthTokenFromHeaders', () => {
    it('should return undefined when it feeds req.headers equals undefined', () => {
      // Arrange
      const req: Partial<Request> = {
        headers: undefined,
      };

      // Act
      const result = extractAuthTokenFromHeaders(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.headers equals null', () => {
      // Arrange
      const req: Partial<Request> = {
        headers: null,
      };

      // Act
      const result = extractAuthTokenFromHeaders(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.headers equals empty object', () => {
      // Arrange
      const req: Partial<Request> = {
        headers: {},
      };

      // Act
      const result = extractAuthTokenFromHeaders(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.headers with values but it does not match with token key', () => {
      // Arrange
      const req: Partial<Request> = {
        headers: {
          otherKey: 'test-token',
        },
      };

      // Act
      const result = extractAuthTokenFromHeaders(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.headers with values, it matchs with token key but it has not Bearer token', () => {
      // Arrange
      const req: Partial<Request> = {
        headers: {
          [headerConstants.accessToken]: 'test-token',
        },
      };

      // Act
      const result = extractAuthTokenFromHeaders(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return token when it feeds req.headers with values, it matchs with token key and it has Bearer token', () => {
      // Arrange
      const req: Partial<Request> = {
        headers: {
          [headerConstants.accessToken]: 'Bearer test-token',
        },
      };

      // Act
      const result = extractAuthTokenFromHeaders(req as Request);

      // Assert
      expect(result).toEqual('test-token');
    });
  });

  describe('extractAuthTokenFromCookies', () => {
    it('should return undefined when it feeds req.cookies equals undefined', () => {
      // Arrange
      const req: Partial<Request> = {
        cookies: undefined,
      };

      // Act
      const result = extractAuthTokenFromCookies(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.cookies equals null', () => {
      // Arrange
      const req: Partial<Request> = {
        cookies: null,
      };

      // Act
      const result = extractAuthTokenFromCookies(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.cookies equals empty object', () => {
      // Arrange
      const req: Partial<Request> = {
        cookies: {},
      };

      // Act
      const result = extractAuthTokenFromCookies(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.cookies with values but it does not match with token key', () => {
      // Arrange
      const req: Partial<Request> = {
        cookies: {
          otherKey: 'test-token',
        },
      };

      // Act
      const result = extractAuthTokenFromCookies(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.cookies with values, it matchs with token key but it has not Bearer token', () => {
      // Arrange
      const req: Partial<Request> = {
        cookies: {
          [headerConstants.accessToken]: 'test-token',
        },
      };

      // Act
      const result = extractAuthTokenFromCookies(req as Request);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return token when it feeds req.cookies with values, it matchs with token key and it has Bearer token', () => {
      // Arrange
      const req: Partial<Request> = {
        cookies: {
          [headerConstants.accessToken]: 'Bearer test-token',
        },
      };

      // Act
      const result = extractAuthTokenFromCookies(req as Request);

      // Assert
      expect(result).toEqual('test-token');
    });
  });

  describe('formatToken', () => {
    it('should return null when it feeds token equals undefined', () => {
      // Arrange
      const token = undefined;

      // Act
      const result = formatToken(token);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null when it feeds token equals null', () => {
      // Arrange
      const token = null;

      // Act
      const result = formatToken(token);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null when it feeds token equals empty string', () => {
      // Arrange
      const token = '';

      // Act
      const result = formatToken(token);

      // Assert
      expect(result).toBeNull();
    });

    it('should return "Bearer 0" when it feeds token equals "0"', () => {
      // Arrange
      const token = '0';

      // Act
      const result = formatToken(token);

      // Assert
      expect(result).toEqual(`${headerConstants.bearer} 0`);
    });

    it('should return "Bearer test-token" when it feeds token equals "test-token"', () => {
      // Arrange
      const token = 'test-token';

      // Act
      const result = formatToken(token);

      // Assert
      expect(result).toEqual(`${headerConstants.bearer} test-token`);
    });

    it('should return "Bearer 0123-test-token" when it feeds token equals "0123-test-token"', () => {
      // Arrange
      const token = '0123-test-token';

      // Act
      const result = formatToken(token);

      // Assert
      expect(result).toEqual(`${headerConstants.bearer} 0123-test-token`);
    });
  });

  describe('getGraphqlModuleSecret', () => {
    it('should return undefined when it feeds req.baseUrl and role equals undefined', () => {
      // Arrange
      const req = { baseUrl: undefined } as Request;
      const role: Role = undefined;

      // Act
      const result = getGraphqlModuleSecret(req, role);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.baseUrl and role equals null', () => {
      // Arrange
      const req = { baseUrl: null } as Request;
      const role: Role = null;

      // Act
      const result = getGraphqlModuleSecret(req, role);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.baseUrl equals adminModule and role equals "employee"', () => {
      // Arrange
      const req = { baseUrl: graphqlRouteConstants.adminModule } as Request;
      const role: Role = 'employee';

      // Act
      const result = getGraphqlModuleSecret(req, role);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return secret when it feeds req.baseUrl equals adminModule and role equals "admin"', () => {
      // Arrange
      const req = { baseUrl: graphqlRouteConstants.adminModule } as Request;
      const role: Role = 'admin';

      // Act
      const result = getGraphqlModuleSecret(req, role);

      // Assert
      expect(result).toEqual(expect.any(String));
    });

    it('should return secret when it feeds req.baseUrl equals employeeModule and role equals "employee"', () => {
      // Arrange
      const req = { baseUrl: graphqlRouteConstants.employeeModule } as Request;
      const role: Role = 'employee';

      // Act
      const result = getGraphqlModuleSecret(req, role);

      // Assert
      expect(result).toEqual(expect.any(String));
    });

    it('should return undefined when it feeds req.baseUrl equals employeeModule and role equals "admin"', () => {
      // Arrange
      const req = { baseUrl: graphqlRouteConstants.employeeModule } as Request;
      const role: Role = 'admin';

      // Act
      const result = getGraphqlModuleSecret(req, role);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('getGraphqlModule', () => {
    it('should return undefined when it feeds req.baseUrlequals undefined', () => {
      // Arrange
      const req = { baseUrl: undefined } as Request;

      // Act
      const result = getGraphqlModule(req);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.baseUrlequals null', () => {
      // Arrange
      const req = { baseUrl: null } as Request;

      // Act
      const result = getGraphqlModule(req);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined when it feeds req.baseUrl equals adminModule', () => {
      // Arrange
      const req = { baseUrl: graphqlRouteConstants.adminModule } as Request;

      // Act
      const result = getGraphqlModule(req);

      // Assert
      expect(result).toEqual('admin');
    });

    it('should return secret when it feeds req.baseUrl equals employeeModule', () => {
      // Arrange
      const req = { baseUrl: graphqlRouteConstants.employeeModule } as Request;

      // Act
      const result = getGraphqlModule(req);

      // Assert
      expect(result).toEqual(expect.any(String));
    });
  });
});
