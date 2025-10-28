'use client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { TProject } from 'types/projects';
import { fetchAPI } from 'utils/http';

type TClientView = {
	id: string;
};

const ProjectPreview = ({ id }: TClientView) => {
	const [project, setProject] = useState<TProject | null>(null);

	const fetchProject = useCallback(async () => {
		const { res, data, message, success } = await fetchAPI({
			endpoint: `/api/projects/${id}`,
		});
		if (!res.ok || !success) {
			toast.error(message);
			return;
		}
		setProject(data);
	}, [id]);

	useEffect(() => {
		fetchProject();
	}, [fetchProject]);

	if (!project) {
		return <p>No existe el projecto</p>;
	}
	return (
		<div className="flex justify-center items-center">
			<iframe
				className="w-[90vw] h-[80vh]"
				src={project.liveUrl}
				title={project.title}
			/>
		</div>
	);
};

export default ProjectPreview;
