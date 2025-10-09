'use client';
import { Card } from 'components/ui';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { FaGithub, FaPlay } from 'react-icons/fa';
import type { TProject } from 'types/projects';

export default function ProjectsPage() {
	const [projects, setProjects] = useState<TProject[]>([]);

	const getProjects = useCallback(async () => {
		const res = await fetch('/api/projects');
		if (res.ok) {
			const { data } = await res.json();
			setProjects(data);
		}
	}, []);

	useEffect(() => {
		getProjects();
	}, [getProjects]);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
			{projects.map((project) => (
				<Card
					key={project._id}
					title={project.title}
					description={project.description}
					img={project.image}
					content={
						<div className="flex justify-between">
							<Link
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-zinc-700 dark:text-zinc-100 text-2xl"
							>
								<FaGithub />
							</Link>
							{project.liveUrl && (
								<Link
									className="text-zinc-700 dark:text-zinc-100 text-2xl"
									href={`/projects/${project._id}`}
								>
									<FaPlay />
								</Link>
							)}
						</div>
					}
				/>
			))}
		</div>
	);
}
