import { Button, ImageLibrary, Input, Select, TextArea } from 'components/ui/';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import type { TProject } from 'types/projects';
import { fetchAPI } from 'utils/http';

type TProjectForm = {
	onSuccess: () => void;
	project?: TProject;
	mode: 'create' | 'edit';
};

const ProjectForm = ({ onSuccess, project, mode }: TProjectForm) => {
	const [form, setForm] = useState<Partial<TProject>>(
		project ?? {
			title: '',
			description: '',
			type: 'front',
			repoUrl: '',
			image: '',
			liveUrl: '',
		}
	);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const endpoint =
			mode === 'create' ? '/api/projects' : `/api/projects/${project?._id}`;
		const method = mode === 'create' ? 'POST' : 'PATCH';

		const { success, message, res } = await fetchAPI({
			endpoint,
			method,
			body: JSON.stringify(form),
		});

		if (!res.ok || !success) {
			toast.error(message);
			return;
		}
		toast.success(message);
		onSuccess();
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<form className="flex flex-col p-2" onSubmit={handleSubmit}>
			<div className="flex w-full gap-4">
				<div className="flex flex-col w-2/3 gap-2">
					<Input
						required
						label="Título"
						type="text"
						name="title"
						placeholder="Título"
						value={form.title}
						onChange={handleChange}
					/>
					<TextArea
						required
						label="Descripción"
						name="description"
						placeholder="Descripción"
						value={form.description}
						onChange={handleChange}
					/>
					<Select.Wrapper
						name="type"
						required
						value={form.type}
						onChange={handleChange}
					>
						<Select.Option value="">Select an option</Select.Option>
						<Select.Option value="front">Frontend</Select.Option>
						<Select.Option value="back">Backend</Select.Option>
						<Select.Option value="full">Fullstack</Select.Option>
						<Select.Option value="ia">IA</Select.Option>
					</Select.Wrapper>
				</div>
				<div className="flex justify-center items-center flex-1">
					<ImageLibrary
						selected={form.image}
						onChange={(url) => setForm({ ...form, image: url ?? '' })}
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 my-2">
				<Input
					required
					label="Demo URL"
					type="text"
					name="liveUrl"
					placeholder="Demo URL"
					value={form.liveUrl}
					onChange={handleChange}
				/>
				<Input
					required
					label="Repo URL"
					type="text"
					name="repoUrl"
					placeholder="Repo URL"
					value={form.repoUrl}
					onChange={handleChange}
				/>
			</div>
			<div className="flex justify-end">
				<Button>{mode === 'create' ? 'Guardar' : 'Actualizar'}</Button>
			</div>
		</form>
	);
};

export default ProjectForm;
