import { type Document, Schema, type Types } from 'mongoose';
import { getModel } from 'utils/db/modelFactory';

export interface IPost extends Document {
	title: string;
	subtitle: string;
	content: string;
	ert: number; // estimated reading time
	tags: string[];
	claps: number;
	comments: Types.ObjectId[];
	createdAt?: Date;
	updatedAt?: Date;
}

const PostSchema = new Schema<IPost>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		subtitle: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
		},
		ert: {
			type: Number,
			required: true,
		},
		claps: {
			type: Number,
			default: 0,
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Tags',
			},
		],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comments',
			},
		],
	},
	{
		timestamps: true,
	}
);

export const PostModel = getModel<IPost>('Post', PostSchema);
