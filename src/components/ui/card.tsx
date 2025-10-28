import Image from 'next/image';
import type { ReactNode } from 'react';

type TCard = {
	title: string;
	description: string;
	img?: string;
	content?: ReactNode;
	mini?: boolean;
};

const Card = ({ title, description, img, content, mini = false }: TCard) => {
	if (mini)
		return (
			<div className="flex w-72 h-20 bg-stone-100 border border-gray-200 rounded-lg shadow-sm shadow-stone-500/40 hover:shadow-rose-800/30 dark:bg-zinc-800 dark:border-gray-700">
				{img && (
					<div className="relative w-1/3 overflow-hidden rounded-l-lg">
						<Image
							className="object-cover object-center"
							src={img}
							alt={title}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							fill
						/>
					</div>
				)}
				<div className="p-2 w-2/3 flex items-center">
					<p className="mb-2 text-xs font-semibold text-zinc-800 dark:text-stone-100 line-clamp-3">
						{title}
					</p>
				</div>
			</div>
		);

	return (
		<div className="flex max-w-sm min-h-56  bg-stone-100 border border-gray-200 rounded-lg shadow-sm shadow-stone-500/40 hover:shadow-rose-800/30 dark:bg-zinc-800 dark:border-gray-700">
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
			<div className="p-3 w-1/2 flex flex-col justify-between">
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
