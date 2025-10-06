'use client';
import clsx from 'clsx';
import { useEffect, useId } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

type TModal = {
	title: string;
	isOpen: boolean;
	onClose: () => void;
	size?: 'sm' | 'md' | 'lg' | 'full' | 'auto';
	children: React.ReactNode;
};

const sizes = {
	auto: 'max-w-auto',
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg',
	full: 'max-w-full',
};

export default function Modal({
	title,
	isOpen,
	onClose,
	size = 'md',
	children,
}: TModal) {
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
				className={clsx(
					'relative bg-white p-4 rounded shadow-md z-10',
					sizes[size]
				)}
			>
				<header className="flex justify-between items-center">
					<h2 id={labelId} className="text-lg font-bold">
						{title}
					</h2>
					<button
						type="button"
						aria-label="Close modal"
						onClick={onClose}
						className="text-gray-600 hover:text-gray-800"
					>
						<FaTimesCircle />
					</button>
				</header>
				<main className="mt-2">{children}</main>
			</div>
		</div>
	);
}
