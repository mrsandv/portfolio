'use client';

import { Modal } from 'components/ui';
import Button from 'components/ui/button';
import { useEffect, useState } from 'react';
import type { TProject } from 'types/projects';
import AddProject from './addProject';

const ProjectsWrapper = () => {
	const [projects, setProjects] = useState<Array<TProject>>([]);
	const [modalStatus, setModalStatus] = useState<boolean>(false);

	const fetchProjects = async () => {
		const res = await fetch('/api/projects');
		if (res.ok) {
			const { data, success, message } = await res.json();
			if (success) {
				setProjects(data);
			} else {
				console.error(message);
			}
		}
	};

	useEffect(() => {
		fetchProjects();
	});

	return (
		<div className="w-full">
			<div className="flex justify-end items-center w-full">
				<Button
					variant="accent"
					onClick={() => {
						setModalStatus(true);
					}}
				>
					Add Project
				</Button>
				<Modal
					title="Upload Image"
					onClose={() => {
						setModalStatus(!modalStatus);
					}}
					isOpen={modalStatus}
				>
					<AddProject />
				</Modal>
			</div>
			<div>
				{Object.keys(projects).map((key) => {
					console.log(key);
					return <h1 key={key}>some</h1>;
					// return <Card key={project._id} {...project} />;
				})}
			</div>
		</div>
	);
};

export default ProjectsWrapper;
