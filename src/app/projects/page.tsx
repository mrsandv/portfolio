'use client';
import { Card } from 'components/ui';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
	const [projects, setProjects] = useState([]);

	const getProjects = async () => {
		const res = await fetch('/api/projects');
		if (res.ok) setProjects(await res.json());
	};

	useEffect(() => {
		getProjects();
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
			{Object.keys(projects).map((key) => {
				console.log(key);
				return <h1 key={key}>some</h1>;
			})}
			<Card
				title="some"
				description="fksndsjabsdjnasdjn fvojasnsa dijasd asdijasd nasdijasd nasdjkbasdmn asdjk"
				img="dfsdfsndf"
			/>
		</div>
	);
}
