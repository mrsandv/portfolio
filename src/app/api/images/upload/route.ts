import { put } from '@vercel/blob';
import { ImageModel } from 'models/image';
import { db } from 'utils/db';

export async function POST(request: Request) {
	try {
		await db();
		const { searchParams } = new URL(request.url);
		const filename = searchParams.get('filename');

		if (!filename) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Filename is required',
				}),
				{ status: 400 }
			);
		}

		if (!request.body) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Request body is required',
				}),
				{ status: 400 }
			);
		}

		const blob = await put(filename, request.body, {
			access: 'public',
			addRandomSuffix: true,
			token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN,
		});

		const data = await ImageModel.create({
			title: filename.split('.')[0],
			alt: filename.split('.')[0],
			url: blob.url,
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Image uploaded successfully',
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
