export type TPost = {
	_id: string;
	title: string;
	description: string;
	image: string;
	url: string;
	code: string;
	tags: string[];
	createdAt?: Date;
	updatedAt?: Date;
};
