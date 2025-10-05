import { type Model, model, models, type Schema } from 'mongoose';

export const getModel = <T>(
	name: string,
	schema: Schema<T>,
	collection?: string
): Model<T> => {
	return models[name] || model<T>(name, schema, collection);
};
