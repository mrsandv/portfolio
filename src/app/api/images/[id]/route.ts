import { del } from '@vercel/blob';
import { ImageModel } from 'models/image';
import { db } from 'utils/db';

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		await db();
		const body = await request.json();

		const data = await ImageModel.findOneAndUpdate({ _id: id }, body, {
			new: true,
		});
		if (!data) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Image not found',
				}),
				{ status: 404 }
			);
		}
		return new Response(
			JSON.stringify({
				success: true,
				message: 'The ',
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

export async function DELETE(
	_: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		await db();
		const data = await ImageModel.findOne({ _id: id });
		if (!data) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Image not found',
				}),
				{ status: 404 }
			);
		}
		await del(data.url);
		await ImageModel.findByIdAndDelete({ _id: id });

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Image deleted successfully',
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
