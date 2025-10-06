'use client';
import { Card } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
import type { TPost } from 'types/posts';

export default function BlogPage() {
	const [posts, setPosts] = useState<TPost[]>([]);

	const getPosts = useCallback(async () => {
		const res = await fetch('/api/blog');
		if (res.ok) {
			const { data } = await res.json();
			setPosts(data);
		}
	}, []);

	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
			{posts.map((post) => (
				<Card
					key={post._id}
					title={post.title}
					description={post.description}
					img={post.image}
				/>
			))}
		</div>
	);
}
