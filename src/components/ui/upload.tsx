'use client';

import { type FormEvent, useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Button from './button';
import Image from 'next/image';

type TUploadImage = {
	onSuccess: () => void;
};

export default function UploadImage({ onSuccess }: TUploadImage) {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const handleSelectFile = () => {
		inputFileRef.current?.click();
	};

	const handleFileChange = () => {
		const file = inputFileRef.current?.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputFileRef.current?.files?.[0]) {
			toast.error('Selecciona una imagen primero');
			return;
		}

		try {
			setIsUploading(true);
			const file = inputFileRef.current.files[0];

			const res = await fetch(`/api/images/upload?filename=${file.name}`, {
				method: 'POST',
				body: file,
			});

			const { success, message } = await res.json();

			if (success) {
				toast.success(message);
				setPreview(null);
				onSuccess();
				inputFileRef.current.value = '';
			} else {
				toast.error(message);
			}
		} catch (error) {
			console.error(error);
			toast.error('Error al subir la imagen');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<form
				onSubmit={handleUpload}
				className="border-2 border-dashed border-rose-900 rounded-md p-4 flex flex-col items-center gap-4"
			>
				<input
					ref={inputFileRef}
					type="file"
					accept="image/jpeg, image/png, image/webp"
					onChange={handleFileChange}
					className="hidden"
				/>
				<button
					type="button"
					onClick={handleSelectFile}
					className="cursor-pointer flex flex-col items-center justify-center p-6 rounded-md hover:bg-rose-50 transition"
				>
					{preview ? (
						<Image
							src={preview}
							alt="Preview"
							width={100}
							height={100}
							className="w-40 h-40 object-cover rounded-md border border-rose-200"
						/>
					) : (
						<>
							<FaUpload className="text-rose-900 text-3xl mb-2" />
							<p className="text-sm text-rose-900 font-medium">
								Selecciona una imagen
							</p>
						</>
					)}
				</button>
				<Button
					type="submit"
					disabled={isUploading}
					className={`bg-rose-900 text-zinc-100 py-2 px-4 rounded-2xl hover:bg-rose-800 transition ${
						isUploading ? 'opacity-60 cursor-not-allowed' : ''
					}`}
				>
					{isUploading ? 'Subiendo...' : 'Subir imagen'}
				</Button>
			</form>
		</div>
	);
}
