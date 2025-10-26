'use client';
import { Button, Modal } from 'components/ui';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { TImage } from 'types/images';

type TImageLibrary = {
	selected?: string;
	onChange?: (url: string | null) => void;
};

type TSelected = {
	id: string;
	url: string;
};

const ImageLibrary = ({ selected, onChange }: TImageLibrary) => {
	const [images, setImages] = useState<TImage[]>([]);
	const [loading, setLoading] = useState(false);
	const [modalStatus, setModalStatus] = useState(false);
	const [selectedImage, setSelectedImage] = useState<TSelected | null>(null);

	const fetchImages = useCallback(async () => {
		setLoading(true);
		const res = await fetch('/api/images');
		const { data, success, message } = await res.json();
		if (res.ok && success) {
			setImages(data);
		} else {
			toast.error(message || 'Error al cargar imágenes');
		}
		setLoading(false);
	}, []);

	const handleChange = (image: { id: string; url: string }) => {
		setSelectedImage(image);
	};

	const handleSelect = () => {
		if (selectedImage) {
			onChange?.(selectedImage.url);
			setModalStatus(false);
		}
	};

	const handleClear = () => {
		setSelectedImage(null);
		onChange?.(null);
	};

	useEffect(() => {
		if (selected) {
			setSelectedImage({ id: '', url: selected });
		} else {
			setSelectedImage(null);
		}
	}, [selected]);

	useEffect(() => {
		fetchImages();
	}, [fetchImages]);

	return (
		<div className="flex flex-col w-full gap-2 items-center justify-center">
			{selectedImage ? (
				<div className="relative w-full flex justify-center">
					<Image
						src={selectedImage.url}
						alt="Selected image"
						width={100}
						height={100}
						className="rounded-lg border"
					/>
					<button
						type="button"
						className="absolute top-1 right-1 bg-black/70 text-rose-600 text-xs px-2 py-1 rounded-full cursor-pointer"
						onClick={handleClear}
					>
						<FaTimesCircle />
					</button>
				</div>
			) : (
				<div className="text-gray-500 italic text-sm">No image selected</div>
			)}

			<Button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					setModalStatus(true);
				}}
			>
				{selectedImage ? 'Change Image' : 'Add Image'}
			</Button>

			<Modal
				size="auto"
				title="Image Library"
				onClose={() => setModalStatus(false)}
				isOpen={modalStatus}
			>
				{loading ? (
					<div className="text-center py-10 text-gray-500">
						Cargando imágenes...
					</div>
				) : images.length === 0 ? (
					<div className="text-center py-10 text-gray-500">
						No hay imágenes disponibles
					</div>
				) : (
					<>
						<div className="flex flex-wrap gap-4 p-4 max-h-[400px] overflow-y-auto">
							{images.map((image) => (
								<button
									type="button"
									key={image._id}
									className={`rounded-xl relative p-2 border-2 transition-all duration-200 
									${selectedImage?.id === image._id ? 'border-rose-500 shadow-md scale-105' : 'border-transparent'}`}
									onClick={() =>
										handleChange({ id: image._id, url: image.url })
									}
								>
									<Image
										src={image.url}
										alt={image.title}
										width={100}
										height={100}
										className="rounded-lg"
									/>
								</button>
							))}
						</div>
						<div className="flex justify-end p-4">
							<Button type="button" onClick={handleSelect}>
								Select
							</Button>
						</div>
					</>
				)}
			</Modal>
		</div>
	);
};

export default ImageLibrary;
