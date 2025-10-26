import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

type TInput = {
	label: string;
	message?: string;
	variant?: 'success' | 'accent' | 'danger';
};

const baseStyles =
	'block w-full rounded-lg text-sm p-2.5 border focus:ring-2 transition-all duration-200';

const variants = {
	input: {
		accent:
			'bg-rose-50 border border-rose-500 text-rose-900 placeholder-rose-700 text-sm rounded-lg focus:ring-rose-500 dark:bg-gray-700 focus:border-rose-500 block w-full p-2.5 dark:text-rose-500 dark:placeholder-rose-500 dark:border-rose-500',
		danger:
			'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
		success:
			'bg-teal-50 border border-teal-500 text-teal-900 placeholder-teal-700 text-sm rounded-lg focus:ring-teal-500 dark:bg-gray-700 focus:border-teal-500 block w-full p-2.5 dark:text-teal-500 dark:placeholder-teal-500 dark:border-teal-500',
	},
	label: {
		accent: 'text-rose-700 focus:ring-rose-300 dark:focus:ring-rose-800',
		success: 'text-teal-700 focus:ring-teal-300 dark:focus:ring-teal-800',
		danger: 'text-red-700 focus:ring-red-300 dark:focus:ring-red-800',
	},
};

const disabledStyles = 'opacity-60 pointer-events-none';

const Input = ({
	label,
	message,
	variant = 'accent',
	...restProps
}: TInput & InputHTMLAttributes<HTMLInputElement>) => {
	const { disabled, name } = restProps;

	return (
		<div className="flex flex-col">
			<label
				htmlFor={`${name}-input`}
				className={clsx(
					'block text-[10px] font-medium',
					variants.label[variant]
				)}
			>
				{label}
			</label>
			<input
				{...restProps}
				id={`${name}-input`}
				className={clsx(baseStyles, variants.input[variant], {
					[disabledStyles]: disabled,
				})}
			/>
			{message && (
				<p className="mt-2 text-sm text-red-500 dark:text-red-400">{message}</p>
			)}
		</div>
	);
};

export default Input;
