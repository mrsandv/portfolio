import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type TButton = {
	children: ReactNode;
	variant?: 'accent' | 'danger' | 'success';
};
const baseStyles =
	'font-medium text-zinc-100 rounded-lg text-sm px-5 py-2 focus:outline-none cursor-pointer focus:ring-2';

const variants = {
	accent:
		'bg-zinc-700 hover:bg-zinc-800  focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800',
	danger:
		'bg-red-700 hover:bg-red-800  focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
	success:
		'bg-teal-700 hover:bg-teal-800  focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800',
};

const disabledStyles = 'opacity-60 pointer-events-none';

const Button = ({
	children,
	variant = 'accent',
	...restProps
}: TButton & ButtonHTMLAttributes<HTMLButtonElement>) => {
	const isDisabled = restProps.disabled;
	return (
		<button
			{...restProps}
			className={clsx(baseStyles, variants[variant], {
				[disabledStyles]: isDisabled,
			})}
		>
			{children}
		</button>
	);
};

export default Button;
