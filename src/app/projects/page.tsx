'use client';
import { Card } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
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
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
			{projects.map((project) => (
				<Card
					key={project._id}
					title={project.title}
					description={project.description}
					img={project.image}
				/>
			))}
		</div>
	);
}
