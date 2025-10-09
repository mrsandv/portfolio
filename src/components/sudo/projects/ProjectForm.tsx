import { Button, ImageLibrary, Input, TextArea } from 'components/ui/';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import type { TProject } from 'types/projects';

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

		const res = await fetch(endpoint, {
			method,
			body: JSON.stringify(form),
			headers: { 'Content-Type': 'application/json' },
		});

		const { success, message } = await res.json();
		if (success) {
			toast.success(message);
			onSuccess();
		} else {
			toast.error(message);
		}
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
			<Input
				label="Título"
				type="text"
				name="title"
				placeholder="Título"
				value={form.title}
				message="some"
				onChange={handleChange}
			/>

			<ImageLibrary
				selected={form.image}
				onChange={(url) => setForm({ ...form, image: url ?? '' })}
			/>

			<TextArea
				label="Descripción"
				name="description"
				placeholder="Descripción"
				value={form.description}
				onChange={handleChange}
			/>

			<select name="type" value={form.type} onChange={handleChange}>
				<option value="front">Frontend</option>
				<option value="back">Backend</option>
				<option value="full">Fullstack</option>
				<option value="ia">IA</option>
			</select>

			<Button>{mode === 'create' ? 'Guardar' : 'Actualizar'}</Button>
		</form>
	);
};

export default ProjectForm;
