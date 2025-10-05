import { Schema } from 'mongoose';
import { getModel } from 'utils/db/modelFactory';

export interface IImages {
	_id?: string;
	url: string;
	alt: string;
	title: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const ImageSchema = new Schema<IImages>(
	{
		title: {
			type: String,
			required: false,
		},
		alt: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const ImageModel = getModel<IImages>('Image', ImageSchema, 'Image');
