import { Button, ImageLibrary, Input, TextArea } from 'components/ui/';
import { type ChangeEvent, type FormEvent, useId, useState } from 'react';
import { toast } from 'react-toastify';
import type { TProject } from 'types/projects';

const AddProject = () => {
	const [form, setForm] = useState<Partial<TProject>>({
		title: '',
		description: '',
		type: 'front',
		code: '',
		image: '',
		url: '',
	});

	const id = useId();
	console.log({ id });

	const createProject = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch('/api/projects', {
			method: 'POST',
			body: JSON.stringify(form),
			headers: { 'Content-Type': 'application/json' },
		});
		const { success, message } = await res.json();
		if (success) {
			toast.success(message);
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
		<form className="grid grid-cols-2 gap-2" onSubmit={createProject}>
			<Input
				label="Título"
				type="text"
				name="title"
				placeholder="Título"
				onChange={handleChange}
			/>
			<ImageLibrary selected={form.image} onChange={() => {}} />
			<TextArea
				label="Descripción"
				name="description"
				placeholder="Descripción"
				onChange={handleChange}
			/>

			<select name="type" id={id} onChange={handleChange}>
				<option value="front">Frontend</option>
				<option value="back">Backend</option>
				<option value="full">Fullstack</option>
				<option value="ia">IA</option>
			</select>

			<Button>Guardar</Button>
		</form>
	);
};

export default AddProject;
