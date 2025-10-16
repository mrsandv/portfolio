'use client';
import { useEffect, useId } from 'react';
import {
	FaCheckDouble,
	FaExclamationTriangle,
	FaTimesCircle,
} from 'react-icons/fa';
import Button from './button';

type TDialog = {
	title: string;
	content?: string;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	variant?: 'danger' | 'success';
	confirmText: string;
};

const Dialog = ({
	title,
	isOpen,
	onClose,
	onConfirm,
	confirmText,
	content,
	variant = 'success',
}: TDialog) => {
	const labelId = useId();
	const modalId = useId();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) onClose();
		};

		if (isOpen) {
			const prevFocus = document.activeElement as HTMLElement;
			const dialog = document.getElementById(modalId);
			dialog?.focus();

			window.addEventListener('keydown', handleKeyDown);
			return () => {
				window.removeEventListener('keydown', handleKeyDown);
				prevFocus?.focus();
			};
		}
	}, [isOpen, onClose, modalId]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black/60"
				aria-hidden="true"
				onClick={onClose}
			/>
			<div
				id={modalId}
				role="dialog"
				aria-modal="true"
				aria-labelledby={labelId}
				tabIndex={-1}
				className=" bg-white dark:bg-zinc-800 p-5 rounded-md shadow-md z-10 h-[250px] flex flex-col justify-between items-center relative"
			>
				<button
					type="button"
					aria-label="Close modal"
					onClick={onClose}
					className="text-gray-600 hover:text-rose-800 cursor-pointer absolute top-4 right-4"
				>
					<FaTimesCircle className="w-6 h-6" />
				</button>

				{variant === 'success' ? (
					<FaCheckDouble className="w-10 h-10 text-teal-500" />
				) : (
					<FaExclamationTriangle className="w-10 h-10 text-rose-500" />
				)}
				<h2 id={labelId} className="text-base font-bold dark:text-zinc-100">
					{title}
				</h2>
				{content && <p className="dark:text-zinc-100 text-sm">{content}</p>}
				<div className="flex justify-between w-full">
					<Button onClick={onClose}>Cancel</Button>
					<Button variant={variant} onClick={onConfirm}>
						{confirmText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Dialog;
