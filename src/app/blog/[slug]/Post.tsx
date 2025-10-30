'use client';

import { Editor, Loader } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
// import { FaHandsClapping, FaRegComment } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import type { TPost } from 'types/posts';
import { fetchAPI } from 'utils/http';
import { humanFormatDate } from 'utils/misc';

type TPostProps = {
	slug: string;
};

const Post = ({ slug }: TPostProps) => {
	const [post, setPost] = useState<TPost | null>(null);
	const [isLoading, setIsloading] = useState<boolean>(false);

	const fetchPost = useCallback(async () => {
		setIsloading(true);
		const { res, success, message, data } = await fetchAPI({
			endpoint: `/api/blog/${slug}`,
		});

		if (!success || !res.ok) {
			toast.error(message);
			return;
		}
		setPost(data);
		setIsloading(false);
	}, [slug]);

	useEffect(() => {
		fetchPost();
	}, [fetchPost]);

	if (isLoading) {
		return <Loader />;
	}

	if (!post) return <div>Hubo un error al cargar el post</div>;

	return (
		<div className="p-2 md:p-5 w-full md:w-3/5 mx-auto">
			<h1 className="w-full font-bold text-2xl md:text-4xl mb-5 text-black dark:text-zinc-50">
				{post.title}
			</h1>
			<p className="w-full text-zinc-500 dark:text-zinc-200 text-md md:text-xl mb-5">
				{post.subtitle}
			</p>
			<div className="flex align-middle justify-between">
				<div className="flex items-center gap-2">
					<span className="font-mono text-xs md:text-sm dark:text-zinc-100 hover:underline cursor-pointer">
						{post.author || 'mrsan'}
					</span>
					<span className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 ">{`${post.ert} minute${post.ert >= 2 ? 's' : ''} read`}</span>
				</div>
				<span className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
					{humanFormatDate(post.createdAt)}
				</span>
			</div>
			{/* <div className="border-t border-b border-zinc-200 gap-2 flex my-5 py-3 px-2 md:px-5 justify-between items-center">
				<span className="flex gap-1 items-center text-zinc-600 dark:text-zinc-400 text-sm">
					<FaHandsClapping
						onClick={() => {}}
						className="text-zinc-600 animate-bounce hover:opacity-60 hover:scale-105 cursor-pointer mx-2 w-5 h-5"
					/>
					{post.claps}
				</span>
				<a href={`#comments-${slug}`}>
					<FaRegComment className="text-zinc-600 hover:opacity-60 hover:scale-105 cursor-pointer  w-5 h-5" />
				</a>
			</div> */}
			<Editor editable={false} content={post.content} />
			<div id={`comments-${slug}`}>
				{post.comments.map((comment) => (
					<div key={comment}>{comment}</div>
				))}
			</div>
		</div>
	);
};

export default Post;
