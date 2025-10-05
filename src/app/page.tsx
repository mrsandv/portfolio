import HomeCard from 'components/home/card';
import Link from 'next/link';
import { FaCoffee, FaGithub, FaHackerrank, FaLinkedinIn } from 'react-icons/fa';

export default function Home() {
	return (
		<div className="flex flex-1">
			<HomeCard size="xl">
				<div className="flex flex-col justify-around h-2/3 p-5">
					<p className="animate-pulse text-black dark:text-white ">
						Welcome to my space hole 🪅 Software developer
					</p>
					<div className="flex w-1/4 justify-between">
						<Link
							href="https://github.com/mrsandv"
							target="_blank"
							className="text-lg text-indigo-800 hover:opacity-90 dark:text-zinc-200"
						>
							<FaGithub />
						</Link>
						<Link
							href="htpps://linkedin.com/in/mrsan"
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
				</div>
			</HomeCard>
			<div className="text-black dark:text-white mx-2 flex flex-col justify-between w-2/3 min-h-full gap-2">
				<HomeCard size="lg" link="/projects">
					<p className="my-2">
						<span className="text-3xl">💻</span> Projects
					</p>
					<p className="my-2 text-xl">Descubre lo que he construido</p>
				</HomeCard>
				<HomeCard size="lg" link="/blog">
					<p className="my-2">
						<span className="text-3xl">👾</span> Blog
					</p>
					<p className="my-2 text-xl">Capsulas y opiniones sobre tecnología</p>
				</HomeCard>
				<HomeCard size="lg" link="/resume">
					<p className="my-2">
						<span className="text-3xl">💼</span> Resume
					</p>
					<p className="my-2 text-xl">
						Mi experiencia profesional y habilidades
					</p>
				</HomeCard>
			</div>
		</div>
	);
}
