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
			'bg-indigo-50 border border-indigo-500 text-indigo-900 placeholder-indigo-700 text-sm rounded-lg focus:ring-indigo-500 dark:bg-gray-700 focus:border-indigo-500 block w-full p-2.5 dark:text-indigo-500 dark:placeholder-indigo-500 dark:border-indigo-500',
		danger:
			'text-rose-900 bg-rose-50 hover:bg-indigo-100/50 focus:ring-rose-300 border border-rose-500',
		// placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
		success: 'text-white bg-rose-700 hover:bg-rose-800 focus:ring-rose-300',
	},
	label: {
		accent: 'text-indigo-700 focus:ring-indigo-300 dark:focus:ring-indigo-800',
		success: 'text-black focus:ring-gray-300 dark:focus:ring-gray-800',
		danger: 'text-white focus:ring-rose-300 dark:focus:ring-rose-800',
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
				<p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
					{message}
				</p>
			)}
		</div>
	);
};

export default Input;
