import {
	Button,
	Editor,
	ImageLibrary,
	Input,
	MultiSelect,
} from 'components/ui/';
import {
	type ChangeEvent,
	type FormEvent,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { toast } from 'react-toastify';
import type { TPost, TTag } from 'types/posts';
import { fetchAPI } from 'utils/http';

type TPostForm = {
	onSuccess: () => void;
	post?: TPost;
	mode: 'create' | 'edit';
};

const PostForm = ({ onSuccess, post, mode }: TPostForm) => {
	const [form, setForm] = useState<Partial<TPost>>(post ?? {});
	const [tags, setTags] = useState<TTag[]>([]);

	const fetchTags = useCallback(async () => {
		const { success, message, data, res } = await fetchAPI({
			endpoint: '/api/blog/tags',
		});

		if (!res.ok || !success) {
			toast.error(message);
		}
		setTags(data);
	}, []);

	useEffect(() => {
		fetchTags();
	}, [fetchTags]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const endpoint = mode === 'create' ? '/api/blog' : `/api/blog/${post?._id}`;
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
						label="Título"
						type="text"
						name="title"
						placeholder="Título"
						value={form.title}
						onChange={handleChange}
					/>
					<Input
						label="Subtitle"
						name="subtitle"
						placeholder="Subtitle"
						value={form.subtitle}
						onChange={handleChange}
					/>
					<Input
						label="Estimated reading time"
						type="number"
						name="ert"
						placeholder="Estimated reading time"
						min={0}
						max={30}
						value={form.ert}
						onChange={handleChange}
					/>

					<MultiSelect
						options={tags.map((tag) => ({
							label: tag.displayName,
							value: tag._id,
						}))}
						value={form.tags}
						placeholder="Tags"
						onSave={(value) => setForm({ ...form, tags: value })}
					/>
				</div>
				<div className="flex justify-center items-center flex-1">
					<ImageLibrary
						selected={form.image}
						onChange={(url) => setForm({ ...form, image: url ?? '' })}
					/>
				</div>
			</div>
			<div className="my-5">
				<Editor
					content={form.content}
					onChange={(content) => setForm({ ...form, content })}
				/>
			</div>
			<div className="flex justify-end">
				<Button>{mode === 'create' ? 'Guardar' : 'Actualizar'}</Button>
			</div>
		</form>
	);
};

export default PostForm;
