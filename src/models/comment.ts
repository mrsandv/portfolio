import { type Document, Schema } from 'mongoose';
import { getModel } from 'utils/db/modelFactory';

export interface IComment extends Document {
	body: string;
	votes: {
		up: number;
		down: number;
	};
	status: 'revision' | 'rejected' | 'approved';
	createdAt?: Date;
	updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>(
	{
		body: {
			type: String,
			required: false,
			trim: true,
		},
		votes: {
			up: {
				type: Number,
				default: 0,
			},
			down: {
				type: Number,
				default: 0,
			},
		},
		status: {
			type: String,
			default: 'revision',
			enum: ['revision', 'rejected', 'approved'],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const PostModel = getModel<IComment>('Comment', CommentSchema);
