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
		'inline-flex items-center px-2 py-1 text-sm font-medium text-center text-zinc-100 bg-rose-700 rounded-full hover:bg-rose-800 focus:ring-2 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800';
	const activeStyle = 'bg-rose-600';
	return (
		<button
			{...restProps}
			type="button"
			className={clsx(baseStyles, { active: activeStyle })}
		>
			{text}
			<span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-rose-800 bg-rose-200 rounded-full">
				{count}
			</span>
		</button>
	);
};

export default Chip;
