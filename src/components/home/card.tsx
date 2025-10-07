import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

type TCardProps = {
	children: ReactNode;
	link?: string;
};

const HomeCard = ({ children, link }: TCardProps) => {
	const baseClasses =
		'bg-stone-100 dark:bg-zinc-800 rounded-lg w-full flex flex-col justify-center items-start flex-1 px-5 py-4 select-none shadow-sm shadow-stone-500/50';

	const clickable = link
		? 'hover:shadow-md hover:opacity-90 hover:shadow-indigo-800/50 cursor-pointer transition-all duration-200 ease-in-out'
		: '';

	return link ? (
		<Link className={clsx(baseClasses, clickable)} href={link}>
			{children}
		</Link>
	) : (
		<section className={clsx(baseClasses)}>{children}</section>
	);
};

export default HomeCard;
