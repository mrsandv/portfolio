'use client';
import { Button, Dialog, Modal, UploadImage } from 'components/ui/';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { TImage } from 'types/images';

type TModalState =
	| { type: 'none' }
	| { type: 'create' }
	| { type: 'edit'; image: TImage }
	| { type: 'delete'; image: TImage };

const ImagesWrapper = () => {
	const [images, setImages] = useState<TImage[]>([]);
	const [modal, setModal] = useState<TModalState>({ type: 'none' });

	const handleDelete = async () => {
		if (modal.type !== 'delete') return;
		const res = await fetch(`/api/images/${modal.image._id}`, {
			method: 'DELETE',
		});
		const { success, message } = await res.json();
		if (!success || !res.ok) {
			toast.error(message || 'Something went wrong');
			return;
		}
		toast.success(message);
		fetchImages();
		setModal({ type: 'none' });
	};

	const fetchImages = useCallback(async () => {
		const res = await fetch('/api/images');
		const { data, success, message } = await res.json();
		if (success) {
			setImages(data);
		} else {
			toast.error(message);
		}
	}, []);

	useEffect(() => {
		fetchImages();
	}, [fetchImages]);

	return (
		<div className="w-full">
			<div className="flex justify-end items-center w-full  mb-5">
				<Button
					onClick={() => {
						setModal({ type: 'create' });
					}}
				>
					Add Image
				</Button>
				{modal.type === 'create' && (
					<Modal
						title="Upload Image"
						onClose={() => {
							setModal({ type: 'none' });
						}}
						isOpen
					>
						<UploadImage
							onSuccess={() => {
								fetchImages();
								setModal({ type: 'none' });
							}}
						/>
					</Modal>
				)}
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{images.map((image) => (
					<div key={image._id} className="rounded-2xl h-[200px] relative z-0">
						<button
							type="button"
							className="absolute bottom-2 right-2 z-10 bg-zinc-800/90 rounded-full p-2 cursor-pointer hover:scale-105"
							onClick={() => setModal({ type: 'delete', image: image })}
						>
							<FaTrash className="text-red-600 w-4 h-4" />
						</button>
						<span className="absolute bottom-2 left-2 z-10 rounded-lg text-sm px-2 py-1 text-zinc-100 bg-zinc-950/60">
							{image.alt}
						</span>
						<Image
							src={image.url}
							alt={image.title}
							fill
							className="object-cover object-center rounded-xl"
						/>
					</div>
				))}
			</div>
			{modal.type === 'delete' && (
				<Dialog
					variant="danger"
					title={`Delete: ${modal.image.title}`}
					content="Are you sure you want to delete this project?"
					isOpen
					confirmText="Yes, delete it."
					onClose={() => setModal({ type: 'none' })}
					onConfirm={handleDelete}
				/>
			)}
		</div>
	);
};

export default ImagesWrapper;
