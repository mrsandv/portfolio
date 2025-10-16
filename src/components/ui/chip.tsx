import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

type TChip = {
	active?: boolean;
	count: number;
	text: string;
};

const Chip = ({
	text,
	count,
	active = false,
	...restProps
}: TChip & ButtonHTMLAttributes<HTMLButtonElement>) => {
	const baseStyles =
		'inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-zinc-100 bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800';
	const activeStyle = 'bg-indigo-600';
	return (
		<button
			{...restProps}
			type="button"
			className={clsx(baseStyles, { active: activeStyle })}
		>
			{text}
			<span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-full">
				{count}
			</span>
		</button>
	);
};

export default Chip;
