import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const res = NextResponse.json({
			success: true,
			message: 'Logout successful',
		});

		res.cookies.set('token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			expires: new Date(0),
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
