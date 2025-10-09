'use client';
import { Modal, UploadImage } from 'components/ui/';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import type { TImages } from 'types/images';

const ImagesWrapper = () => {
	const [images, setImages] = useState<TImages[]>([]);
	const [modalStatus, setModalStatus] = useState<boolean>(false);

	const handleDelete = async (id: string | unknown) => {
		const res = await fetch(`/api/images/${id}`, {
			method: 'DELETE',
		});
		if (res.ok) {
			fetchImages();
		}
	};

	const fetchImages = useCallback(async () => {
		const res = await fetch('/api/images');
		if (res.ok) {
			const { data, success, message } = await res.json();
			if (success) {
				setImages(data);
			} else {
				console.error(message);
			}
		}
	}, []);

	useEffect(() => {
		fetchImages();
	}, [fetchImages]);

	return (
		<div className="w-full">
			<div className="flex justify-end items-center w-full">
				<button
					type="button"
					className="bg-green-600 text-white py-2 px-4 rounded hover:opacity-80 hover:cursor-pointer"
					onClick={() => {
						setModalStatus(true);
					}}
				>
					Add Image
				</button>
				<Modal
					title="Upload Image"
					onClose={() => {
						setModalStatus(!modalStatus);
					}}
					isOpen={modalStatus}
				>
					<UploadImage />
				</Modal>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{images.map((image) => (
					<div
						key={image._id}
						className="rounded-2xl overflow-hidden h-[200px] relative"
					>
						<button
							type="button"
							className="absolute top-1 right-1 z-10 bg-zinc-800/90 rounded-full p-1 cursor-pointer"
							onClick={() => handleDelete(image._id)}
						>
							<FaTrash className="text-red-600" />
						</button>
						<Image
							src={image.url}
							alt={image.title}
							fill
							className="object-cover object-center"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ImagesWrapper;
