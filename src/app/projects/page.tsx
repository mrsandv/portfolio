'use client';
import { Card, Loader } from 'components/ui';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { FaGithub, FaPlay } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { TProject } from 'types/projects';
import { fetchAPI } from 'utils/http';

export default function ProjectsPage() {
	const [projects, setProjects] = useState<TProject[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getProjects = useCallback(async () => {
		setIsLoading(true);
		const { res, success, data, message } = await fetchAPI({
			endpoint: '/api/projects',
		});
		if (!res.ok || !success) {
			toast.error(message);
			return;
		}
		setProjects(data);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		getProjects();
	}, [getProjects]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="flex flex-wrap gap-4 p-4">
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
								className="text-zinc-700 dark:text-zinc-100 cursor-pointer hover:opacity-40"
							>
								<FaGithub className="w-5 h-5" />
							</Link>
							{project.liveUrl && (
								<Link
									className="text-zinc-700 dark:text-zinc-100 cursor-pointer hover:opacity-40"
									href={`/projects/${project._id}`}
								>
									<FaPlay className="w-5 h-5" />
								</Link>
							)}
						</div>
					}
				/>
			))}
		</div>
	);
}
