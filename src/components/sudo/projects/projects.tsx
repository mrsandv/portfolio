'use client';
import { Button, Card, Dialog, Loader, Modal } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { TProject } from 'types/projects';
import { fetchAPI } from 'utils/http';
import ProjectForm from './ProjectForm';

type TModalState =
	| { type: 'none' }
	| { type: 'create' }
	| { type: 'edit'; project: TProject }
	| { type: 'delete'; project: TProject };

const ProjectsWrapper = () => {
	const [projects, setProjects] = useState<TProject[]>([]);
	const [modal, setModal] = useState<TModalState>({ type: 'none' });
	const [isLoading, setIsloading] = useState<boolean>(false);

	const fetchProjects = useCallback(async () => {
		setIsloading(true);
		const { res, data, success, message } = await fetchAPI({
			endpoint: '/api/projects',
		});
		if (!res.ok || !success) {
			toast.error(message);
		} else {
			setProjects(data);
		}
		setIsloading(false);
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	const handleDelete = async () => {
		if (modal.type !== 'delete') return;

		const { res, message, success } = await fetchAPI({
			endpoint: `/api/projects/${modal.project._id}`,
			method: 'DELETE',
		});

		if (!success || !res.ok) {
			toast.error(message || 'Something went wrong');
			return;
		}

		toast.success(message);
		fetchProjects();
		setModal({ type: 'none' });
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="w-full ">
			<div className="flex justify-end items-center w-full my-2">
				<Button
					variant="accent"
					onClick={() => {
						setModal({ type: 'create' });
					}}
				>
					Add Project
				</Button>
			</div>
			<div className="flex gap-4 flex-wrap">
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
									<FaEdit className="w-4 h-4" />
								</Button>
								<Button
									variant="danger"
									onClick={() => setModal({ type: 'delete', project })}
								>
									<FaTrash className="w-4 h-4" />
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
					size="sm"
					onClose={() => {
						fetchProjects();
						setModal({ type: 'none' });
					}}
				>
					<ProjectForm
						mode="create"
						onSuccess={() => {
							fetchProjects();
							setModal({ type: 'none' });
						}}
					/>
				</Modal>
			)}
			{modal.type === 'edit' && (
				<Modal
					title={`Edit: ${modal.project.title}`}
					isOpen
					size="lg"
					onClose={() => setModal({ type: 'none' })}
				>
					<ProjectForm
						project={modal.project}
						mode="edit"
						onSuccess={() => {
							fetchProjects();
							setModal({ type: 'none' });
						}}
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
