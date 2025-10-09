import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

type TInput = {
	label: string;
	message?: string;
	variant?: 'info' | 'accent' | 'danger';
};

const baseStyles =
	'block w-full rounded-lg text-sm p-2.5 border focus:ring-2 transition-all duration-200';

const variants = {
	info: 'text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800',
	accent:
		'text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800',
	danger:
		'text-white bg-rose-700 hover:bg-rose-800 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800',
};

const disabledStyles = 'opacity-60 pointer-events-none';

const Input = ({
	label,
	message,
	variant = 'info',
	...restProps
}: TInput & InputHTMLAttributes<HTMLInputElement>) => {
	const { disabled, name } = restProps;

	return (
		<div className="flex flex-col">
			<label
				htmlFor={`${name}-input`}
				className={clsx('block mb-1 text-sm font-medium', variants[variant])}
			>
				{label}
			</label>

			<input
				{...restProps}
				id={`${name}-input`}
				className={clsx(baseStyles, variants[variant], {
					[disabledStyles]: disabled,
				})}
			/>

			{message && (
				<p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
					{message}
				</p>
			)}
		</div>
	);
};

export default Input;
