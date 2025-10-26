'use client';
import { Button, Card, Dialog, Modal } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { TProject } from 'types/projects';
import ProjectForm from './ProjectForm';

type TModalState =
	| { type: 'none' }
	| { type: 'create' }
	| { type: 'edit'; project: TProject }
	| { type: 'delete'; project: TProject };

const ProjectsWrapper = () => {
	const [projects, setProjects] = useState<TProject[]>([]);
	const [modal, setModal] = useState<TModalState>({ type: 'none' });

	const fetchProjects = useCallback(async () => {
		const res = await fetch('/api/projects');
		if (res.ok) {
			const { data, success, message } = await res.json();
			if (success) {
				setProjects(data);
			} else {
				console.error(message);
			}
		}
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	const handleDelete = async () => {
		if (modal.type !== 'delete') return;

		const res = await fetch(`/api/projects/${modal.project._id}`, {
			method: 'DELETE',
		});
		const { success, message } = await res.json();

		if (!success || !res.ok) {
			toast.error(message || 'Something went wrong');
			return;
		}

		toast.success(message);
		fetchProjects();
		setModal({ type: 'none' });
	};

	return (
		<div className="w-full">
			<div className="flex justify-end items-center w-full">
				<Button
					variant="accent"
					onClick={() => {
						setModal({ type: 'create' });
					}}
				>
					Add Project
				</Button>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{projects.map((project) => (
					<Card
						key={project._id}
						title={project.title}
						img={project.image}
						content={
							<div className="flex w-full justify-between">
								<Button
									onClick={() => setModal({ type: 'edit', project: project })}
								>
									<FaEdit className="text-rose-500 text-lg cursor-pointer" />
								</Button>
								<Button onClick={() => setModal({ type: 'delete', project })}>
									<FaTrash className="text-red-500 cursor-pointer text-lg" />
								</Button>
							</div>
						}
						description={project.description}
					/>
				))}
			</div>
			{modal.type === 'create' && (
				<Modal
					title="New Project"
					isOpen
					onClose={() => setModal({ type: 'none' })}
				>
					<ProjectForm mode="create" onSuccess={fetchProjects} />
				</Modal>
			)}
			{modal.type === 'edit' && (
				<Modal
					title={`Edit: ${modal.project.title}`}
					isOpen
					onClose={() => setModal({ type: 'none' })}
				>
					<ProjectForm
						project={modal.project}
						mode="edit"
						onSuccess={fetchProjects}
					/>
				</Modal>
			)}
			{modal.type === 'delete' && (
				<Dialog
					variant="danger"
					title={`Delete: ${modal.project.title}`}
					content="Are you sure you want to delete this project?"
					isOpen
					confirmText="Yes, delete it."
					onClose={() => setModal({ type: 'none' })}
					onConfirm={handleDelete}
				/>
			)}
		</div>
	);
};

export default ProjectsWrapper;
