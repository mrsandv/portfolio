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
		'bg-indigo-700 hover:bg-indigo-800  focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800',
	danger:
		'bg-rose-700 hover:bg-rose-800  focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800',
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
