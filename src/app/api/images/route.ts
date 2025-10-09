import { ImageModel } from 'models/image';
import { db } from 'utils/db';

export async function GET() {
	try {
		await db();
		const data = await ImageModel.find().sort({ createdAt: -1 }).lean();
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
