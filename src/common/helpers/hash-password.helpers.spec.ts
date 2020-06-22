import { generateSalt, buildHashedPassword } from './hash-password.helpers';

describe('common/helpers/hash-password.helpers specs', () => {
  describe('generateSalt', () => {
    it('should generate random string with 32 length', () => {
      // Arrange

      // Act
      const result = generateSalt();

      // Assert
      expect(result).toEqual(expect.any(String));
      expect(result).toHaveLength(32);
    });
  });

  describe('buildHashedPassword', () => {
    it('should throw an error when it feeds password and salt equals undefined', async () => {
      // Arrange
      const password: string = undefined;
      const salt = undefined;

      // Act
      const result = buildHashedPassword(password, salt);

      // Assert
      await expect(result).rejects.toThrow();
    });

    it('should throw an error when it feeds password and salt equals null', async () => {
      // Arrange
      const password: string = null;
      const salt = null;

      // Act
      const result = buildHashedPassword(password, salt);

      // Assert
      await expect(result).rejects.toThrow();
    });

    it('should return a hashedPassword and salt when it feeds password and salt equals empty string', async () => {
      // Arrange
      const password: string = '';
      const salt = 'test salt';

      // Act
      const result = await buildHashedPassword(password, salt);

      // Assert
      expect(result).toEqual(expect.any(String));
      expect(result).toHaveLength(128);
    });

    it('should return a hashedPassword and salt when it feeds password equals "this-is-my-super-secret-password"', async () => {
      // Arrange
      const password: string = 'this-is-my-super-secret-password';
      const salt = 'test salt';

      // Act
      const result = await buildHashedPassword(password, salt);

      // Assert
      expect(result).toEqual(expect.any(String));
      expect(result).toHaveLength(128);
    });
  });
});
