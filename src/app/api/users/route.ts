import argon2 from 'argon2';
import { UserModel } from 'models/user';
import { db } from 'utils/db';

export async function POST(req: Request) {
	try {
		await db();

		const body = await req.json();

		const { password, name, email } = body;

		const data = await UserModel.findOne({ email });

		if (data) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'User already on DB',
				}),
				{ status: 409 }
			);
		}

		const hash = await argon2.hash(password);

		await UserModel.create({
			name,
			user: email.split('@')[0],
			email,
			password: hash,
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Success on user creation',
				data,
			}),
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);
		return new Response(
			JSON.stringify({
				success: false,
				message: 'There is an error querying the database',
				err,
			}),
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		await db();
		const users = await UserModel.find().select({ password: 0, __v: 0 });

		return new Response(
			JSON.stringify({
				success: true,
				data: users,
				message: 'Success on user retrieval',
			})
		);
	} catch (err) {
		return new Response(
			JSON.stringify({
				success: false,
				message: 'There is an error querying the database',
				err,
			}),
			{ status: 500 }
		);
	}
}
