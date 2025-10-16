'use client';
import { BlogWrapper, ImagesWrapper, ProjectsWrapper } from 'components/sudo/';
import { type ReactNode, useState } from 'react';

const tabs: Array<{ id: number; label: string; component: ReactNode }> = [
	{ id: 0, label: 'Projects', component: <ProjectsWrapper /> },
	{
		id: 1,
		label: 'Blog post',
		component: <BlogWrapper />,
	},
	{ id: 2, label: 'Images', component: <ImagesWrapper /> },
];

export default function SudoPage() {
	const [activeTab, setActiveTab] = useState<number>(0);

	return (
		<div>
			<div className="w-full h-10">
				{tabs.map(({ id, label }) => (
					<button
						type="button"
						className={`${activeTab === id ? 'border-indigo-600' : 'border-zinc-300'} cursor-pointer border-b-1 pb-0.5 mx-5 text-black dark:text-zinc-100`}
						key={id}
						onClick={() => {
							setActiveTab(id);
						}}
					>
						{label}
					</button>
				))}
			</div>
			<div className="flex text-black min-h-[75vh] p-5">
				{tabs[activeTab].component}
			</div>
		</div>
	);
}
