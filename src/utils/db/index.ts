import { connect } from 'mongoose';

export const db = async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL env is not defined');
	}

	const connection = await connect(process.env.DATABASE_URL as string, {
		tls: true,
	}).catch((err) => console.error(err));
	return connection;
};
