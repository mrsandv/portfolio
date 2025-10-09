import { ProjectsModel } from 'models/projects';
import { db } from 'utils/db';

export async function GET() {
	try {
		await db();
		const data = await ProjectsModel.find().sort({ createdAt: -1 }).lean();
		return new Response(
			JSON.stringify({
				success: true,
				message: 'Projects fetched successfully',
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

		console.log(req);
		const body = await req.json();

		const { title, description, image, liveUrl, type, repoUrl } = body;

		const data = await ProjectsModel.create({
			title,
			description,
			image,
			liveUrl,
			type,
			repoUrl,
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
