import { Schema } from 'mongoose';
import { getModel } from 'utils/db/modelFactory';

type TRol = 'owner' | 'admin' | 'guest';

export interface IUser {
	_id?: string;
	name: string;
	user: string;
	email: string;
	password: string;
	rol: TRol;
	createdAt?: Date;
	updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: false,
		},
		user: {
			type: String,
			required: true,
		},
		email: { type: String, required: true, unique: true },
		password: {
			type: String,
			required: true,
		},
		rol: {
			type: String,
			required: true,
			default: 'guest',
		},
	},
	{
		timestamps: true,
	}
);

export const UserModel = getModel<IUser>('User', UserSchema, 'Users');
