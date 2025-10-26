'use client';

import { Editor } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
import { FaHandsClapping, FaRegComment } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import type { TPost } from 'types/posts';
import { humanFormatDate } from 'utils/misc';

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
		<div className="p-5 w-3/5 mx-auto">
			<h1 className="w-full font-bold text-4xl mb-5 text-black dark:text-zinc-50">
				{post.title}
			</h1>
			<p className="w-full text-zinc-500 dark:text-zinc-200 text-xl mb-5">
				{post.subtitle}
			</p>
			<div className="flex align-middle justify-between mx-5">
				<div className="flex items-center gap-2">
					<span className="font-mono text-sm dark:text-zinc-100 hover:underline cursor-pointer">
						{post.author || 'mrsan'}
					</span>
					<span className="text-sm text-zinc-600 dark:text-zinc-400 ">{`${post.ert} minute${post.ert >= 2 ? 's' : ''} read`}</span>
				</div>
				<span className="text-sm text-zinc-600 dark:text-zinc-400">
					{humanFormatDate(post.createdAt)}
				</span>
			</div>
			<div className="border-t border-b border-zinc-200 gap-2 flex my-5 py-3 px-5 justify-between items-center">
				<span className="flex gap-1 items-center text-zinc-600 dark:text-zinc-400 text-sm">
					<FaHandsClapping
						onClick={() => {}}
						className="text-rose-600 hover:opacity-60 hover:scale-105 cursor-pointer mx-2 w-5 h-5"
					/>
					{post.claps}
				</span>
				<a href="#comments">
					<FaRegComment className="text-rose-600 hover:opacity-60 hover:scale-105 cursor-pointer  w-5 h-5" />
				</a>
			</div>
			<Editor editable={false} content={post.content} />
		</div>
	);
};

export default Post;
