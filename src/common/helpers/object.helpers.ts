export const omitUndefined = <T extends {}>(object: T): Partial<T> =>
  Object.keys(object).reduce((newObject, key) => {
    const value = object[key];
    return value !== undefined
      ? {
          ...newObject,
          [key]: value,
        }
      : newObject;
  }, {});
