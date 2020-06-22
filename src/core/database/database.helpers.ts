import {
  Model as MongooseModel,
  Types,
  Document,
  QueryFindOneAndUpdateOptions,
} from 'mongoose';
import { omitUndefined } from 'common/helpers/object.helpers';

export const isEditMode = (value: string) => Boolean(value);

export const findOneAndUpsert = async <
  Model extends { _id: string },
  Query extends { _id: string }
>(
  mongooseModel: MongooseModel<Model & Document>,
  query: Query,
  entity: Model,
  options?: QueryFindOneAndUpdateOptions
): Promise<Model> => {
  const editMode = isEditMode(query._id);
  const id = editMode ? query._id : new Types.ObjectId();
  const entityWithId = setDocumentAndSubdocumentId(id, entity);
  return await mongooseModel
    .findOneAndUpdate(
      {
        ...query,
        _id: id,
      } as any,
      entityWithId,
      {
        new: true,
        upsert: !editMode,
        ...options,
      }
    )
    .lean();
};

const setDocumentAndSubdocumentId = (id, entity) =>
  Object.keys(entity).reduce(
    (result, key) => ({
      ...result,
      [key]: isIdKey(key) ? id : entity[key],
    }),
    {}
  );

const isIdKey = (key: string) => key.includes('_id');

export const omitSubdocumentUndefined = async <
  Entity extends { _id },
  Key extends keyof Entity
>(
  entity: Entity,
  subdocumentKey: Key
): Promise<Entity> => {
  const { [subdocumentKey]: subdocument, ...rest } = entity;

  const updatedSubdocument = omitUndefined(subdocument);
  const flattenedSubdocument = flatSubdocument(
    updatedSubdocument,
    subdocumentKey
  );

  return {
    ...rest,
    ...flattenedSubdocument,
  } as Entity;
};

const flatSubdocument = (subdocument, subdocumentKey) =>
  Object.keys(subdocument).reduce(
    (result, key) => ({
      ...result,
      [`${subdocumentKey}.${key}`]: subdocument[key],
    }),
    {}
  );

const flatArraySubdocument = (subdocument, subdocumentKey) =>
  Object.keys(subdocument).reduce(
    (result, key) => ({
      ...result,
      [`${subdocumentKey}.$.${key}`]: subdocument[key],
    }),
    {}
  );

const buildUpdateArrayQuery = <Model extends { _id: string }>(
  subdocumentKey: keyof Model,
  entity: any
) => {
  const updatedEntity = flatArraySubdocument(entity, subdocumentKey);
  return { $set: updatedEntity };
};

export const upsertSubdocumentInArray = async <Model extends { _id: string }>(
  mongooseModel: MongooseModel<Model & Document>,
  documentId: any,
  subdocumentKey: keyof Model,
  entity: any,
  options?: QueryFindOneAndUpdateOptions
) => {
  const editMode = isEditMode(entity._id);
  const id = editMode ? entity._id : new Types.ObjectId();
  const newEntity = { ...entity, _id: id };

  const query = editMode
    ? {
        _id: documentId,
        [`${subdocumentKey}._id`]: id,
      }
    : { _id: documentId };

  const update: any = editMode
    ? buildUpdateArrayQuery(subdocumentKey, newEntity)
    : { $push: { [subdocumentKey]: newEntity } };

  return await mongooseModel
    .findOneAndUpdate(query, update, {
      ...options,
      new: true,
      upsert: !editMode,
      projection: {
        [subdocumentKey]: {
          $elemMatch: { _id: id },
        },
      },
    })
    .lean();
};
