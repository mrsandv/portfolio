'use client';
import { CloseCircleIcon } from 'assets/icons';
import { type ReactNode, useEffect } from 'react';
import clsx from 'clsx';

type TModal = {
	children: ReactNode;
	title: string;
	isOpen: boolean;
	onClose: () => void;
	size?: TModalSize;
};

type TModalSize = 'sm' | 'md' | 'lg' | 'full' | 'auto';

const sizes = {
	auto: 'max-w-auto',
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg',
	full: 'max-w-full',
};

const Modal = ({ children, title, isOpen, onClose, size = 'md' }: TModal) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 bg-black/60 ">
			<div
				onClick={onClose}
				className="flex items-center justify-center h-full"
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className={clsx('bg-white p-4 rounded shadow-md', sizes[size])}
				>
					<div className="flex justify-between items-center">
						<h2 className="text-lg font-bold">{title}</h2>
						<button
							className=" text-gray-600 hover:text-gray-800 cursor-pointer"
							onClick={onClose}
						>
							<CloseCircleIcon />
						</button>
					</div>
					<div className="mt-2">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
