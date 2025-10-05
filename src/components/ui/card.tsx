import Image from 'next/image';
import Button from './button';

type TCard = {
	title: string;
	description: string;
	img: string;
};

const Card = ({ title, description, img }: TCard) => {
	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
			{/* <a href="#"> */}
			<Image
				className="rounded-t-lg"
				src={img}
				alt={title}
				height={200}
				width={400}
			/>
			{/* </a> */}
			<div className="p-5">
				{/* <a href="#"> */}
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{title}
				</h5>
				{/* </a> */}
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
					{description}
				</p>
				<div className="flex justify-between">
					<Button>Repo</Button>
					<Button>Demo</Button>
				</div>
			</div>
		</div>
	);
};

export default Card;
