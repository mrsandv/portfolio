import { type Document, Schema } from 'mongoose';
import { getModel } from 'utils/db/modelFactory';

type TType = 'front' | 'back' | 'full' | 'ia';

export interface IProject extends Document {
	title: string;
	description: string;
	image: string;
	liveUrl?: string;
	repoUrl: string;
	type: TType;
	createdAt?: Date;
	updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
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
		liveUrl: {
			type: String,
		},
		repoUrl: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ['front', 'back', 'full', 'ia'],
		},
	},
	{
		timestamps: true,
	}
);

export const ProjectsModel = getModel<IProject>(
	'Projects',
	ProjectSchema,
	'Projects'
);
