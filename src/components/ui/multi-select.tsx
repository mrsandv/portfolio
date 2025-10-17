'use client';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

type TOption = {
	label: string;
	value: string;
};

type TMultiSelectProps = {
	options: TOption[];
	value?: string[];
	onSave: (selected: string[]) => void;
	label?: string;
	placeholder?: string;
};

const MultiSelect = ({
	options,
	value = [],
	onSave,
	label,
	placeholder = 'Selecciona tags...',
}: TMultiSelectProps) => {
	const [selected, setSelected] = useState<string[]>(value);

	const updateSelection = (newSelection: string[]) => {
		setSelected(newSelection);
		onSave(newSelection);
	};

	const toggleOption = (val: string) => {
		updateSelection([...selected, val]);
	};

	const handleRemoveTag = (val: string) => {
		updateSelection(selected.filter((v) => v !== val));
	};

	const availableOptions = useMemo(
		() => options.filter((opt) => !selected.includes(opt.value)),
		[options, selected]
	);

	return (
		<div className="flex flex-col w-full">
			{label && (
				<p className="block text-[10px] font-medium text-indigo-700 mb-1">
					{label}
				</p>
			)}

			<div
				className={clsx(
					'min-h-[44px] border border-indigo-800 rounded-lg p-2 flex flex-wrap gap-2 items-center bg-white'
				)}
			>
				{selected.length === 0 && (
					<span className="text-sm text-gray-400">{placeholder}</span>
				)}
				{selected.map((val) => {
					const item = options.find((o) => o.value === val);
					return (
						<span
							key={val}
							className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs"
						>
							{item?.label}
							<button
								type="button"
								className="text-indigo-600 hover:text-indigo-800"
								onClick={() => handleRemoveTag(val)}
							>
								×
							</button>
						</span>
					);
				})}
			</div>

			{availableOptions.length > 0 && (
				<div className="flex flex-wrap mt-2 gap-2">
					{availableOptions.map((opt) => (
						<button
							key={opt.value}
							type="button"
							onClick={() => toggleOption(opt.value)}
							className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs"
						>
							{opt.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default MultiSelect;
