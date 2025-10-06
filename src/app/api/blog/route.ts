import { PostModel } from 'models/posts';
import { db } from 'utils/db';

export async function GET() {
	try {
		await db();
		const data = await PostModel.find().sort({ createdAt: -1 }).lean();
		return new Response(
			JSON.stringify({
				success: true,
				message: 'Posts fetched successfully',
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

		const { title, description, image, url, type, code } = body;

		const data = await PostModel.create({
			title,
			description,
			image,
			url,
			type,
			code,
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Project created successfully',
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
