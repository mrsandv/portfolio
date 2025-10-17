'use client';

import { Editor } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { TPost } from 'types/posts';

type TPostProps = {
	slug: string;
};

const Post = ({ slug }: TPostProps) => {
	const [post, setPost] = useState<TPost | null>(null);

	const fetchPost = useCallback(async () => {
		const res = await fetch(`/api/blog/${slug}`);

		const { success, message, data } = await res.json();

		if (!success || !res.ok) {
			toast.error(message);
			return;
		}
		setPost(data);
	}, [slug]);

	useEffect(() => {
		fetchPost();
	}, [fetchPost]);

	if (!post) return <div>Hubo un error al cargar el post</div>;

	return (
		<div>
			<h1 className="w-full text-center font-bold text-3xl">{post.title}</h1>
			<p className="w-full text-zinc-700 text-sm">{post.subtitle}</p>
			<div className="flex justify-between">
				<p>{`Lecture time: ${post.ert}`}</p>
				<p>{post.createdAt.slice(0, 10)}</p>
			</div>
			<div>
				<Editor editable={false} content={JSON.parse(post.content)} />
			</div>
		</div>
	);
};

export default Post;
