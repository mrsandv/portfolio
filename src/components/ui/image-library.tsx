'use client';
import { Modal } from 'components/ui/';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { TImages } from 'types/images';

type TImageLibrary = {
	selected?: string;
	onChange: (url: string) => void;
};

const ImageLibrary = ({ selected, onChange }: TImageLibrary) => {
	const [images, setImages] = useState<TImages[]>([]);
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(
		selected || null
	);

	const fetchImages = async () => {
		const res = await fetch('/api/images');
		if (res.ok) {
			const { data, success, message } = await res.json();
			if (success) {
				setImages(data);
			} else {
				toast.error(message);
			}
		}
	};

	const handleSelect = ({ id, url }: { id: string; url: string }) => {
		setSelectedImage(id);
		onChange(url);
	};

	useEffect(() => {
		fetchImages();
	});

	return (
		<div className="flex justify-center items-center">
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
				size="full"
				title="Library"
				onClose={() => {
					setModalStatus(!modalStatus);
				}}
				isOpen={modalStatus}
			>
				<div className="grid grid-cols-3 gap-2">
					{images.map((image) => (
						<button
							type="button"
							key={image._id}
							className={`rounded-xl relative p-2 border-2 transition-all duration-200 
              ${selectedImage === image._id ? 'border-violet-500 shadow-md scale-105' : 'border-transparent'}`}
							onClick={() => handleSelect({ id: image._id, url: image.url })}
						>
							<Image
								src={image.url}
								alt={image.title}
								width={200}
								height={100}
							/>
						</button>
					))}
				</div>
			</Modal>
		</div>
	);
};

export default ImageLibrary;
