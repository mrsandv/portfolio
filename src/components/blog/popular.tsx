import { Card } from 'components/ui';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { TPost } from 'types/posts';

const Popular = () => {
	const [posts, setPosts] = useState<TPost[]>([]);

	const fetchPupular = useCallback(async () => {
		const res = await fetch('api/blog/?popular=true');
		const { success, data, message } = await res.json();

		if (success) {
			setPosts(data);
		} else {
			toast.error(message);
		}
	}, []);

	useEffect(() => {
		fetchPupular();
	}, [fetchPupular]);

	return (
		<div className="flex flex-col h-full justify-between">
			<h1 className="font-bold text-sm dark:text-zinc-100">Top 5</h1>
			<div className="w-full grid grid-cols-1 h-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
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
	);
};

export default Popular;
