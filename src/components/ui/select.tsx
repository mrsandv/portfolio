'use client';
import clsx from 'clsx';
import type {
	SelectHTMLAttributes,
	OptionHTMLAttributes,
	ReactNode,
} from 'react';

type Variant = 'success' | 'accent' | 'danger';

type TSelectWrapper = {
	label?: string;
	message?: string;
	variant?: Variant;
	children?: ReactNode;
};

const baseStyles =
	'block w-full rounded-lg text-sm p-2.5 border focus:ring-2 transition-all duration-200 bg-white';

const variants = {
	select: {
		accent:
			'bg-indigo-50 border border-indigo-500 text-indigo-900 placeholder-indigo-700 focus:ring-indigo-500 focus:border-indigo-500',
		danger:
			'text-rose-900 bg-rose-50 border border-rose-500 focus:ring-rose-300 focus:border-rose-500',
		success:
			'text-emerald-900 bg-emerald-50 border border-emerald-500 focus:ring-emerald-300 focus:border-emerald-500',
	},
	label: {
		accent: 'text-indigo-700',
		danger: 'text-rose-700',
		success: 'text-emerald-700',
	},
};

const disabledStyles = 'opacity-60 pointer-events-none';

export type SelectWrapperProps = TSelectWrapper &
	SelectHTMLAttributes<HTMLSelectElement>;

function Wrapper({
	label,
	message,
	variant = 'accent',
	className,
	children,
	name,
	disabled,
	...rest
}: SelectWrapperProps) {
	const id = name ? `${name}-select` : undefined;

	return (
		<div className="flex flex-col">
			{label && (
				<label
					htmlFor={id}
					className={clsx(
						'block text-[10px] font-medium mb-1',
						variants.label[variant]
					)}
				>
					{label}
				</label>
			)}

			<select
				id={id}
				name={name}
				disabled={disabled}
				className={clsx(
					baseStyles,
					variants.select[variant],
					'appearance-none',
					className,
					{ [disabledStyles]: disabled }
				)}
				{...rest}
			>
				{children}
			</select>

			{message && (
				<p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
					{message}
				</p>
			)}
		</div>
	);
}

export type SelectOptionProps = OptionHTMLAttributes<HTMLOptionElement> & {
	children?: ReactNode;
	variant?: Variant;
};

function Option({ children, className, variant, ...rest }: SelectOptionProps) {
	return (
		<option
			{...rest}
			className={clsx(
				'text-sm',
				variant === 'danger' && 'text-rose-600',
				variant === 'success' && 'text-emerald-600',
				variant === 'accent' && 'text-indigo-600',
				className
			)}
		>
			{children}
		</option>
	);
}

// 🧠 Namespace pattern
const Select = {
	Wrapper,
	Option,
};

export default Select;
