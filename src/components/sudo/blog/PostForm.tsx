import { Button, Editor, ImageLibrary, Input, TextArea } from 'components/ui/';
import {
	type ChangeEvent,
	type FormEvent,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { toast } from 'react-toastify';
import type { TPost, TTag } from 'types/posts';

type TPostForm = {
	onSuccess: () => void;
	post?: TPost;
	mode: 'create' | 'edit';
};

const PostForm = ({ onSuccess, post, mode }: TPostForm) => {
	const [form, setForm] = useState<Partial<TPost>>(post ?? {});
	const [tags, setTags] = useState<TTag[]>([]);

	const fetchTags = useCallback(async () => {
		const res = await fetch('/api/blog/tags');
		const { success, message, data } = await res.json();
		if (success) {
			setTags(data);
		} else {
			toast.error(message);
		}
	}, []);

	useEffect(() => {
		fetchTags();
	}, [fetchTags]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const endpoint = mode === 'create' ? '/api/blog' : `/api/blog/${post?._id}`;
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

	useEffect(() => {
		console.log('form updated:', form);
	}, [form]);

	return (
		<form className="flex flex-col p-2" onSubmit={handleSubmit}>
			<div className="flex w-full gap-4">
				<div className="flex flex-col w-2/3">
					<Input
						label="Título"
						type="text"
						name="title"
						placeholder="Título"
						value={form.title}
						onChange={handleChange}
					/>
					<Input
						label="Reading time"
						type="number"
						name="ert"
						placeholder="Estimated reading time"
						min={0}
						max={30}
						message="Menso"
						variant="danger"
						value={form.ert}
						onChange={handleChange}
					/>
					<Input
						label="Subtitle"
						name="subtitle"
						variant="success"
						placeholder="Subtitle"
						value={form.subtitle}
						onChange={handleChange}
					/>
					<select name="tag" value={form.tags} multiple onChange={handleChange}>
						{tags.map((tag) => (
							<option key={tag._id} value={tag.name}>
								{tag.displayName}
							</option>
						))}
					</select>
				</div>
				<div className="flex justify-center items-center flex-1">
					<ImageLibrary
						selected={form.image}
						onChange={(url) => setForm({ ...form, image: url ?? '' })}
					/>
				</div>
			</div>
			<Editor
				content={JSON.stringify(form.content)}
				onChange={(content) =>
					setForm({ ...form, content: JSON.stringify(content) })
				}
			/>

			<Button>{mode === 'create' ? 'Guardar' : 'Actualizar'}</Button>
		</form>
	);
};

export default PostForm;
