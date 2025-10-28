import { type NextRequest, NextResponse } from 'next/server';
import { verifyToken } from 'utils/jwt';

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (
		pathname.startsWith('/api/login') ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon.ico')
	) {
		return NextResponse.next();
	}

	if (pathname.startsWith('/api')) {
		const apiKey = req.headers.get('x-api-key');
		const validKey = process.env.NEXT_PUBLIC_API_KEY;

		if (!apiKey || apiKey !== validKey) {
			return new NextResponse(
				JSON.stringify({
					success: false,
					message: 'Unauthorized: Missing or invalid API key',
				}),
				{
					status: 401,
					headers: {
						'Content-type': 'application/json',
					},
				}
			);
		}
		return NextResponse.next();
	}

	if (pathname.startsWith('/sudo')) {
		const token = req.cookies.get('token')?.value;

		if (!token) {
			return NextResponse.redirect(new URL('/login', req.url));
		}

		try {
			verifyToken(token);
			return NextResponse.next();
		} catch (err) {
			console.log(err);
			return NextResponse.redirect(new URL('/login', req.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/sudo/:path*', '/api/:path*'], // apply middleware to both
};
