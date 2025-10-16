import { PostModel } from 'models/post';
import type { NextRequest } from 'next/server';
import { db } from 'utils/db';

export async function GET(req: NextRequest) {
	try {
		await db();

		const searchParams = req.nextUrl.searchParams;
		const tag = searchParams.get('tag');
		const popular = searchParams.get('popular');

		const page = parseInt(searchParams.get('page') || '1', 10);
		const limit = parseInt(searchParams.get('limit') || '10', 10);

		const filter: Record<string, string> = {};
		const sort: Record<string, 1 | -1> = { createdAt: -1 };
		let maxLimit = limit;

		if (tag) {
			filter.tags = tag;
		}

		if (popular === 'true') {
			sort.claps = -1;
			maxLimit = 5;
		}

		const skip = (page - 1) * maxLimit;

		const query = PostModel.find(filter)
			.sort(sort)
			.skip(skip)
			.limit(maxLimit)
			.lean();

		const [data, total] = await Promise.all([
			query,
			PostModel.countDocuments(filter),
		]);

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Posts fetched successfully',
				data,
				pagination: {
					page,
					limit: maxLimit,
					total,
					totalPages: Math.ceil(total / maxLimit),
				},
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

		const { title, subtitle, content, ert, tags, image } = body;
		console.log(body);
		const data = await PostModel.create({
			title,
			subtitle,
			content,
			ert,
			tags,
			image,
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
