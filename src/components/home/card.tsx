import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

type TSize = 'xs' | 'lg' | 'md' | 'sm' | 'xl';

type TCardProps = {
	size?: TSize;
	children: ReactNode;
	link?: string;
};

const sizes: Record<TSize, string> = {
	xs: 'text-lg',
	sm: 'text-xl',
	md: 'text-2xl',
	lg: 'text-4xl',
	xl: 'text-6xl',
};

const HomeCard = ({ children, link, size = 'lg' }: TCardProps) => {
	const baseClasses =
		'bg-stone-100 dark:bg-zinc-800 rounded-lg w-full flex flex-col justify-center items-start flex-1 m-2 p-5 cursor:pointer select-none shadow-sm hover:shadow-md shadow-stone-500/50 hover:opacity-90 hover:shadow-indigo-800/90';

	const sizeClass = sizes[size];

	return link ? (
		<Link className={clsx(baseClasses, sizeClass)} href={link}>
			{children}
		</Link>
	) : (
		<div className={clsx(baseClasses, sizeClass)}>{children}</div>
	);
};

export default HomeCard;
