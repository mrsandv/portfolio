import { type Document, Schema } from 'mongoose';
import { getModel } from 'utils/db/modelFactory';

export interface ITag extends Document {
	name: string;
	displayName: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const TagSchema = new Schema<ITag>(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
			trim: true,
		},
		displayName: {
			required: true,
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export const TagModel = getModel<ITag>('Tag', TagSchema);
