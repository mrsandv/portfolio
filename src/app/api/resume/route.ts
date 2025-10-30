import { ResumeModel } from 'models/resume';
import { db } from 'utils/db';

export async function GET() {
	try {
		await db();
		const data = await ResumeModel.findOne();
		return new Response(
			JSON.stringify({
				success: true,
				message: 'Resume fetched successfully',
				data,
			})
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

export async function POST(req: Request) {
	try {
		await db();
		const body = await req.json();

		if (!body) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Request body is required',
				}),
				{ status: 400 }
			);
		}

		const data = await ResumeModel.create(body);

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Resume loaded successfully',
				data,
			}),
			{ status: 201 }
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
