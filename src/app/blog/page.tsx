'use client';
import { Popular, Tags } from 'components/blog/';
import { Card, Widget } from 'components/ui';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import type { TPost } from 'types/posts';

export default function BlogPage() {
	const [posts, setPosts] = useState<TPost[]>([]);

	const getPosts = useCallback(async (tag?: string) => {
		const query = tag ? `?tag=${tag}` : '';
		const res = await fetch(`/api/blog/${query}`);
		if (res.ok) {
			const { data } = await res.json();
			setPosts(data);
		}
	}, []);

	useEffect(() => {
		getPosts();
	}, [getPosts]);

	const filterByTag = (tagId: string) => {
		getPosts(tagId);
	};

	return (
		<div className="flex flex-1 flex-col md:flex-row gap-4">
			<div className="flex w-full sm:w-1/2 lg:w-1/3 flex-col flex-1 gap-4">
				<Widget>
					<Popular />
				</Widget>
				<Widget>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
						{posts.map((post) => (
							<Link key={post._id} href={`/blog/${post._id}`}>
								<Card
									title={post.title}
									description={post.subtitle}
									img={post.image}
								/>
							</Link>
						))}
					</div>
				</Widget>
			</div>

			<div className="text-black dark:text-zinc-100 flex flex-col justify-between sm:w-1/6 gap-4">
				<Widget>
					<Tags handleFilterByTag={filterByTag} />
				</Widget>
			</div>
		</div>
	);
}
