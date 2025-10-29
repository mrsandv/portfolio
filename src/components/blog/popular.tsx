import { Card } from 'components/ui';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { TPost } from 'types/posts';
import { fetchAPI } from 'utils/http';

const Popular = () => {
	const [posts, setPosts] = useState<TPost[]>([]);

	const fetchPupular = useCallback(async () => {
		const { success, data, message, res } = await fetchAPI({
			endpoint: 'api/blog/?popular=true',
		});

		if (!res.ok || !success) {
			toast.error(message);
			return;
		}
		setPosts(data);
	}, []);

	useEffect(() => {
		fetchPupular();
	}, [fetchPupular]);

	return (
		<div className="flex flex-col h-full justify-between">
			<h1 className="font-bold text-sm dark:text-zinc-100">Top 5</h1>
			<div className="w-full flex h-full gap-4 p-4">
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
