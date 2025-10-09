import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

type TWidgetProps = {
	children: ReactNode;
	link?: string;
};

const Widget = ({ children, link }: TWidgetProps) => {
	const baseClasses =
		'bg-stone-100 dark:bg-zinc-800 rounded-lg w-full flex flex-col justify-center items-start flex-1 px-5 py-4 select-none shadow-sm shadow-stone-500/30';

	const clickable = link
		? 'hover:opacity-90 hover:shadow-indigo-800/30 cursor-pointer transition-all duration-200 ease-in-out'
		: '';

	return link ? (
		<Link className={clsx(baseClasses, clickable)} href={link}>
			{children}
		</Link>
	) : (
		<section className={clsx(baseClasses)}>{children}</section>
	);
};

export default Widget;
