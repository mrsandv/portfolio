import { Model, model, models, Schema } from 'mongoose';

export const getModel = <T>(name: string, schema: Schema<T>, collection?: string): Model<T> => {
  return (models[name] || model<T>(name, schema, collection))
}