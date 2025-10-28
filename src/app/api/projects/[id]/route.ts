import { ProjectModel } from 'models/project';
import mongoose from 'mongoose';
import { db } from 'utils/db';

export async function GET(
	_: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		await db();

		const data = await ProjectModel.findOne({ _id: id });

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Success on getting project by id',
				data,
			}),
			{ status: 200 }
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

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		await db();
		const body = await request.json();

		const data = await ProjectModel.findOneAndUpdate({ _id: id }, body, {
			new: true,
		});
		if (!data) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Project not found',
				}),
				{ status: 404 }
			);
		}
		return new Response(
			JSON.stringify({
				success: true,
				message: 'Success on project update',
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

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return new Response(
				JSON.stringify({ success: false, message: 'Invalid project ID' }),
				{ status: 400 }
			);
		}

		const deleted = await ProjectModel.findByIdAndDelete({ _id: id });

		if (!deleted) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Project not found',
				}),
				{ status: 404 }
			);
		}

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Project deleted successfully',
			}),
			{ status: 200 }
		);
	} catch (err) {
		console.log('DELETE: /api/projects/[id] error:', err);

		return new Response(
			JSON.stringify({
				success: false,
				message: 'Internal server error while deleting project',
			}),
			{ status: 500 }
		);
	}
}
