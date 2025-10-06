import { type Document, Schema } from 'mongoose';
import { getModel } from 'utils/db/modelFactory';

export interface IPost extends Document {
	title: string;
	description: string;
	image: string;
	url: string;
	code: string;
	tags: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

const PostSchema = new Schema<IPost>(
	{
		title: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		tags: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

export const PostModel = getModel<IPost>('Posts', PostSchema, 'Posts');
