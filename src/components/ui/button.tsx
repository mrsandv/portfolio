import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type TButton = {
	children: ReactNode;
	variant?: 'info' | 'accent' | 'danger';
};
const baseStyles =
	'font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none cursor-pointer focus:ring-2';

const variants = {
	info: 'text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800',
	accent:
		'text-white bg-violet-700 hover:bg-violet-800  focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800',
	danger:
		'text-white bg-rose-700 hover:bg-rose-800  focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800',
};

const disabledStyles = 'opacity-60 pointer-events-none';

const Button = ({
	children,
	variant = 'info',
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
			{' '}
			{children}
		</button>
	);
};

export default Button;
