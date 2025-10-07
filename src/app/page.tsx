import HomeCard from 'components/home/card';
import Link from 'next/link';
import {
	FaCoffee,
	FaGithub,
	FaHackerrank,
	FaLaptopCode,
	FaLinkedinIn,
	FaRegFileCode,
	FaSith,
} from 'react-icons/fa';

export default function Home() {
	return (
		<div className="flex flex-1 flex-col md:flex-row gap-4">
			<div className="flex w-full sm:w-1/2 lg:w-1/3 flex-col flex-1 gap-4">
				<HomeCard>
					<p className="animate-pulse text-black dark:text-white text-3xl sm:text-5xl mb-5">
						Marco Sandoval
					</p>
					<p className="text-md text-black dark:text-white">
						Software Developer
					</p>
				</HomeCard>
				<HomeCard>
					<p className="animate-pulse text-black dark:text-white text-2xl sm:text-4xl">
						Explore, learn, and build through code.
					</p>
					<p className="text-sm text-black dark:text-white my-5">
						Find me online or support my projects ☕️
					</p>
					<div className="flex gap-4">
						<Link
							href="https://github.com/mrsandv"
							target="_blank"
							className="text-lg text-indigo-800 hover:opacity-90 dark:text-zinc-200"
						>
							<FaGithub />
						</Link>
						<Link
							href="https://linkedin.com/in/mrsan"
							target="_blank"
							className="text-lg text-indigo-800 hover:opacity-90 dark:text-zinc-200"
						>
							<FaLinkedinIn />
						</Link>
						<Link
							href="https://hackerrank.com/profile/mrsan"
							target="_blank"
							className="text-lg text-indigo-800 hover:opacity-90 dark:text-zinc-200"
						>
							<FaHackerrank />
						</Link>
						<Link
							href="https://buymeacoffee.com/mrsan"
							target="_blank"
							className="text-lg text-indigo-800 hover:opacity-90 dark:text-zinc-200"
						>
							<FaCoffee />
						</Link>
					</div>
				</HomeCard>
			</div>

			<div className="text-black dark:text-white flex flex-col justify-between sm:w-1/2 lg:w-2/3 gap-4">
				<HomeCard link="/projects">
					<p className="my-2  text-black dark:text-white text-2xl sm:text-3xl flex items-center">
						<FaLaptopCode className="text-xl animate-pulse mr-2" />
						Projects
					</p>
					<p className="text-md">Discover my creations</p>
				</HomeCard>
				<HomeCard link="/blog">
					<p className="my-2  text-black dark:text-white text-2xl sm:text-3xl flex items-center">
						<FaSith className="text-xl animate-pulse mr-2" /> Blog
					</p>
					<p className="my-2 text-md">Sometimes I write about tech stuff</p>
				</HomeCard>
				<HomeCard link="/resume">
					<p className="my-2  text-black dark:text-white text-2xl sm:text-3xl flex items-center">
						<FaRegFileCode className="text-xl animate-pulse mr-2" /> Resume
					</p>
					<p className="my-2 text-md">Check out my experience and skills</p>
				</HomeCard>
			</div>
		</div>
	);
}
