'use client';
import { Popular, Tags } from 'components/blog/';
import { Card, Widget } from 'components/ui';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { TPost, TTag } from 'types/posts';

export default function BlogPage() {
	const [posts, setPosts] = useState<TPost[]>([]);
	const [tag, setTag] = useState<string>('');

	const getPosts = useCallback(async (tag?: string) => {
		const query = tag ? `?tag=${tag}` : '';
		const res = await fetch(`/api/blog/${query}`);
		const { success, data, message } = await res.json();
		if (!success || !res.ok) {
			toast.error(message);
		} else {
			setPosts(data);
		}
	}, []);

	useEffect(() => {
		getPosts();
	}, [getPosts]);

	const filterByTag = (tagId: TTag) => {
		setTag(tagId.displayName);
		getPosts(tagId._id);
	};

	return (
		<div className="flex flex-1 flex-col-reverse md:flex-row gap-4 p-2">
			<div className="flex w-full sm:w-1/2 lg:w-1/3 flex-col flex-1 gap-4">
				<div className="flex h-1/4">
					<Widget>
						<Popular />
					</Widget>
				</div>
				<Widget>
					<div className="flex flex-col justify-start h-full">
						<h1 className="font-bold text-sm dark:text-zinc-100">
							Todos los post {tag}
						</h1>
						<div className="w-full flex flex-wrap gap-4 p-4 ">
							{posts.map((post) => (
								<Link key={post._id} href={`/blog/${post._id}`}>
									<Card
										mini
										title={post.title}
										description={post.subtitle}
										img={post.image}
									/>
								</Link>
							))}
						</div>
					</div>
				</Widget>
			</div>
			<div className="text-black dark:text-zinc-100 flex flex-col justify-between sm:w-1/12 gap-4">
				<Widget>
					<Tags handleFilterByTag={filterByTag} />
				</Widget>
			</div>
		</div>
	);
}
