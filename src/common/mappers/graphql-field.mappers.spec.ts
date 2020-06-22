import { IGraphQLToolsResolveInfo } from 'apollo-server-express';
import { mapToSelectedFields } from './graphql-field.mappers';

describe('common/mappers/graphql-field.mappers specs', () => {
  describe('mapToSelectedFields', () => {
    it('should return { modelId: 1, modelName: 1 } when it feeds graphqlInfo with { apiId, apiName } and value equals undefined', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'apiId',
                  },
                },
                {
                  name: {
                    value: 'apiName',
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        apiId: string;
        apiName: string;
      }

      interface ModelEntity {
        modelId: string;
        modelName: string;
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(graphqlInfo, {
        apiId: 'modelId',
        apiName: 'modelName',
      });

      // Assert
      expect(result).toStrictEqual({
        modelId: 1,
        modelName: 1,
      });
    });

    it('should return { modelId: 1 } when it feeds graphqlInfo with { apiId } and value equals undefined', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'apiId',
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        apiId: string;
        apiName: string;
      }

      interface ModelEntity {
        modelId: string;
        modelName: string;
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(graphqlInfo, {
        apiId: 'modelId',
        apiName: 'modelName',
      });

      // Assert
      expect(result).toStrictEqual({
        modelId: 1,
      });
    });

    it('should return { modelId: 1, name: 1 } when it feeds graphqlInfo with { apiId, name }, mapObject equals { apiId: "modelId" } and value equals undefined', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'apiId',
                  },
                },
                {
                  name: {
                    value: 'name',
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        apiId: string;
        name: string;
      }

      interface ModelEntity {
        modelId: string;
        name: string;
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(graphqlInfo, {
        apiId: 'modelId',
      });

      // Assert
      expect(result).toStrictEqual({
        modelId: 1,
        name: 1,
      });
    });

    it('should return { modelId: -1, modelName: 2 } when it feeds graphqlInfo with { apiId, apiName } and value equals { apiId: -1, apiName: 2 }', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'apiId',
                  },
                },
                {
                  name: {
                    value: 'apiName',
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        apiId: string;
        apiName: string;
      }

      interface ModelEntity {
        modelId: string;
        modelName: string;
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(
        graphqlInfo,
        {
          apiId: 'modelId',
          apiName: 'modelName',
        },
        { apiId: -1, apiName: 2 }
      );

      // Assert
      expect(result).toStrictEqual({
        modelId: -1,
        modelName: 2,
      });
    });

    it('should return { modelId: -1 } when it feeds graphqlInfo with { apiId } and value equals { apiId: -1, apiName: 2 }', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'apiId',
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        apiId: string;
        apiName: string;
      }

      interface ModelEntity {
        modelId: string;
        modelName: string;
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(
        graphqlInfo,
        {
          apiId: 'modelId',
          apiName: 'modelName',
        },
        { apiId: -1, apiName: 2 }
      );

      // Assert
      expect(result).toStrictEqual({
        modelId: -1,
      });
    });

    it('should return { modelId: -1, name: 2 } when it feeds graphqlInfo with { apiId, name }, mapObject equals { apiId: "modelId" } and value equals { apiId: -1, name: 2 }', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'apiId',
                  },
                },
                {
                  name: {
                    value: 'name',
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        apiId: string;
        name: string;
      }

      interface ModelEntity {
        modelId: string;
        name: string;
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(
        graphqlInfo,
        {
          apiId: 'modelId',
        },
        { apiId: -1, name: 2 }
      );

      // Assert
      expect(result).toStrictEqual({
        modelId: -1,
        name: 2,
      });
    });

    it('should return { modelId:0, name: 1 } when it feeds graphqlInfo with { apiId, name }, mapObject equals { apiId: "modelId" } and value equals { apiId: 0 }', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'apiId',
                  },
                },
                {
                  name: {
                    value: 'name',
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        apiId: string;
        name: string;
      }

      interface ModelEntity {
        modelId: string;
        name: string;
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(
        graphqlInfo,
        {
          apiId: 'modelId',
        },
        { apiId: 0 }
      );

      // Assert
      expect(result).toStrictEqual({
        modelId: 0,
        name: 1,
      });
    });

    it('should return { id: 1, name: 1, lastname: 1 } when it feeds graphqlInfo with { id, name, lastname },  and ModelEntity has only { id , name } ', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'id',
                  },
                },
                {
                  name: {
                    value: 'name',
                  },
                },
                {
                  name: {
                    value: 'lastname',
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        id: string;
        name: string;
        lastname: string;
      }

      interface ModelEntity {
        id: string;
        name: string;
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(graphqlInfo);

      // Assert
      expect(result).toStrictEqual({
        id: 1,
        name: 1,
        lastname: 1,
      });
    });

    it('should return { id: 1, "user.name": 1 } when it feeds graphqlInfo with { id, name },  and ModelEntity has { id , user: { name } } ', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'id',
                  },
                },
                {
                  name: {
                    value: 'name',
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        id: string;
        name: string;
        lastname: string;
      }

      interface ModelEntity {
        id: string;
        user: {
          name: string;
        };
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(graphqlInfo, {
        name: 'user.name',
      });

      // Assert
      expect(result).toStrictEqual({
        id: 1,
        'user.name': 1,
      });
    });

    it('should return { id: 1, "user.name": 1 } when it feeds graphqlInfo with { id, user: { name } },  and ModelEntity has { id , user: { name } } ', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'id',
                  },
                },
                {
                  name: {
                    value: 'user',
                  },
                  selectionSet: {
                    selections: [
                      {
                        name: {
                          value: 'name',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        id: string;
        user: {
          name: string;
        };
      }

      interface ModelEntity {
        id: string;
        user: {
          name: string;
        };
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(graphqlInfo);

      // Assert
      expect(result).toStrictEqual({
        id: 1,
        'user.name': 1,
      });
    });

    it('should return { id: 1, "user.name": 1 } when it feeds graphqlInfo with { id, client: { name } },  and ModelEntity has { id , user: { name } } ', () => {
      // Arrange
      const graphqlInfo = {
        fieldNodes: [
          {
            selectionSet: {
              selections: [
                {
                  name: {
                    value: 'id',
                  },
                },
                {
                  name: {
                    value: 'client',
                  },
                  selectionSet: {
                    selections: [
                      {
                        name: {
                          value: 'name',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ] as ReadonlyArray<any>,
      } as IGraphQLToolsResolveInfo;

      interface APIEntity {
        id: string;
        client: {
          name: string;
        };
      }

      interface ModelEntity {
        id: string;
        user: {
          name: string;
        };
      }

      // Act
      const result = mapToSelectedFields<APIEntity, ModelEntity>(graphqlInfo, {
        'client.name': 'user.name',
      });

      // Assert
      expect(result).toStrictEqual({
        id: 1,
        'user.name': 1,
      });
    });
  });
});
