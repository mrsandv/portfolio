import argon2 from 'argon2';
import { UserModel } from 'models/user';
import { NextResponse } from 'next/server';
import { db } from 'utils/db';
import { signToken } from 'utils/jwt';

export async function POST(req: Request) {
	try {
		await db();

		const body = await req.json();

		const { password, email } = body;

		const data = await UserModel.findOne({ email });

		if (!data) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'User not found',
					data,
				}),
				{ status: 404 }
			);
		}

		const isValid = await argon2.verify(data.password, password);

		if (!isValid) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Invalid password',
				})
			);
		}

		const token = signToken({ id: data._id, email: data.email, rol: data.rol });

		const res = NextResponse.json({
			success: true,
			message: 'Login successful',
		});

		res.cookies.set('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
		});

		return res;
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
