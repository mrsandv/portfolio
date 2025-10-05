'use client';
import { CloseCircleIcon } from 'assets/icons';
import { Modal, UploadImage } from 'components/ui/';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ImagesWrapper = () => {
	const [images, setImages] = useState<Array<any>>([]);
	const [modalStatus, setModalStatus] = useState<boolean>(false);

	const handleDelete = async (id: string) => {
		const res = await fetch(`/api/images/${id}`, {
			method: 'DELETE',
		});
		if (res.ok) {
			fetchImages();
		}
	};

	const fetchImages = async () => {
		const res = await fetch('/api/images');
		if (res.ok) {
			const { data, success, message } = await res.json();
			if (success) {
				setImages(data);
			} else {
				console.error(message);
			}
		}
	};
	useEffect(() => {
		fetchImages();
	});

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
			<div className="grid grid-cols-3 gap-2">
				{images.map((image) => (
					<div key={image._id} className="rounded-4xl bg-red-400 relative">
						<button
							type="button"
							className="absolute top-1 right-1"
							onClick={() => handleDelete(image._id)}
						>
							<CloseCircleIcon />
						</button>
						<Image src={image.url} alt={image.title} width={200} height={100} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ImagesWrapper;
