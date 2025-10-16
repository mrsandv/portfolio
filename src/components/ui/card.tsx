import Image from 'next/image';
import type { ReactNode } from 'react';

type TCard = {
	title: string;
	description: string;
	img?: string;
	content?: ReactNode;
};

const Card = ({ title, description, img, content }: TCard) => {
	return (
		<div className="flex max-w-sm bg-stone-100 border border-gray-200 rounded-lg shadow-sm shadow-stone-500/40 hover:shadow-indigo-800/30 dark:bg-zinc-800 dark:border-gray-700">
			{img && (
				<div className="relative w-1/2 overflow-hidden rounded-l-lg">
					<Image
						className="object-cover object-center"
						src={img}
						alt={title}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
					/>
				</div>
			)}
			<div className="p-5 w-1/2">
				<h5 className="mb-2 text-lg font-bold tracking-tight text-zinc-800 dark:text-stone-100">
					{title}
				</h5>
				<p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
					{description}
				</p>
				{content}
			</div>
		</div>
	);
};

export default Card;
