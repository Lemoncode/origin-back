import { IGraphQLToolsResolveInfo } from 'apollo-server-express';
import { SelectedFields } from '../models';
import { FieldNode } from 'graphql';

type MapKey<ApiEntity> = Partial<
  {
    [key in keyof ApiEntity]: string;
  }
>;

type MapValue<ApiEntity> = Partial<
  {
    [key in keyof ApiEntity]: any;
  }
>;

export const mapToSelectedFields = <ApiEntity, ModelEntity>(
  graphqlInfo: IGraphQLToolsResolveInfo,
  mapKey?: MapKey<ApiEntity> | { [key: string]: string },
  mapValue?: MapValue<ApiEntity>
): SelectedFields<ModelEntity> => {
  const apiKeys = flatSelectionList(graphqlInfo.fieldNodes[0]);

  return apiKeys.reduce((keys, apiKey) => {
    const modelKey = mapKey && mapKey[apiKey];
    const key = modelKey || apiKey;
    const value = getValue(mapValue, apiKey);

    return {
      ...keys,
      [key]: value,
    };
  }, {} as Record<keyof ModelEntity, any>);
};

const flatSelectionList = (fieldNode: FieldNode): string[] =>
  fieldNode.selectionSet.selections.reduce(
    (result, selection: any): string[] => {
      let keys = [`${selection.name.value}`];
      if (selection.selectionSet) {
        const selections = flatSelectionList(selection);
        keys = [...buildComposedKeys(keys[0], selections)];
      }
      return [...result, ...keys];
    },
    []
  );

const buildComposedKeys = (currentKey: string, keys: string[]): string[] =>
  keys.map(key => `${currentKey}.${key}`);

const isDefined = value => value !== undefined && value !== null;

const defaultValue = 1;

const getValue = (mapValue, apiKey) => {
  const mappedValue = isDefined(mapValue)
    ? getMappedValue(mapValue, apiKey)
    : defaultValue;

  return isDefined(mappedValue) ? mappedValue : defaultValue;
};

const getMappedValue = (mapValue, apiKey) =>
  typeof mapValue === 'object' ? mapValue[apiKey] : mapValue;
