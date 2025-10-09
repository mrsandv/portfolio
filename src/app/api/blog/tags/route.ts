import { TagModel } from 'models/tag';
import { db } from 'utils/db';

export async function GET() {
	try {
		await db();
		const tagsWithCount = await TagModel.aggregate([
			{
				$lookup: {
					from: 'posts',
					localField: '_id',
					foreignField: 'tags',
					as: 'posts',
				},
			},
			{
				$project: {
					name: 1,
					count: {
						$size: '$posts',
					},
				},
			},
			{
				$sort: { count: -1 },
			},
		]);

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Tags fetched successfully',
				data: tagsWithCount,
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

		const { name, displayName } = body;

		const data = await TagModel.create({
			name,
			displayName,
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Tag created successfully',
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
