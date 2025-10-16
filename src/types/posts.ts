export type TPost = {
	_id: string;
	title: string;
	subtitle: string;
	content: string;
	image: string;
	ert: number; // estimated raeding time
	tags: string[];
	claps: number;
	comments: string[];
	createdAt?: Date;
	updatedAt?: Date;
};

export type TTag = {
	_id: string;
	name: string;
	displayName: string;
	count: number;
};
