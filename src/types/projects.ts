export type TType = 'front' | 'back' | 'full' | 'ia';

export type TProject = {
	_id: string;
	title: string;
	description: string;
	image: string;
	url: string;
	code: string;
	type: TType;
	createdAt?: Date;
	updatedAt?: Date;
};
