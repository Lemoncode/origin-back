import { omitUndefined } from './object.helpers';

describe('common/helpers/object.helpers specs', () => {
  describe('omitUndefined', () => {
    it('should return same object when it feeds all values has value, null, empty string,0 or empty array', () => {
      // Arrange
      const object = {
        a: 'test-value',
        b: 1,
        c: null,
        d: '',
        e: 0,
        f: [],
        g: [1],
        h: true,
        i: false,
        j: {},
        k: { test: 1 },
      };

      // Act
      const result = omitUndefined(object);

      // Assert
      expect(result).toStrictEqual(object);
    });

    it('should return same object without undefined props when it feeds some undefined values', () => {
      // Arrange
      const object = {
        a: undefined,
        b: 1,
        c: null,
        d: '',
        e: 0,
        f: [],
        g: undefined,
        h: true,
        i: false,
        j: {},
        k: { test: 1 },
      };

      // Act
      const result = omitUndefined(object);

      // Assert
      expect(result).toStrictEqual({
        b: 1,
        c: null,
        d: '',
        e: 0,
        f: [],
        h: true,
        i: false,
        j: {},
        k: { test: 1 },
      });
    });
  });
});
