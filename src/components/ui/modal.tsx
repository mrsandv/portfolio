'use client';
import clsx from 'clsx';
import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
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
	full: 'w-[90vw]',
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

	return createPortal(
		<div className="fixed inset-0 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black/60 z-20"
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
					'relative bg-zinc-100 dark:bg-zinc-600 p-4 rounded shadow-md z-30 ',
					sizes[size]
				)}
			>
				<header className="flex justify-between items-center">
					<h2 id={labelId} className="text-lg font-bold dark:text-zinc-100">
						{title}
					</h2>
					<button
						type="button"
						aria-label="Close modal"
						onClick={onClose}
						className="text-gray-600 hover:text-rose-800"
					>
						<FaTimesCircle className="w-6 h-6" />
					</button>
				</header>
				<main className="mt-2">{children}</main>
			</div>
		</div>,
		document.body
	);
}
