import type { IPost } from 'models/post';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Popular = () => {
	const [posts, setPosts] = useState<IPost[]>([]);

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

	return <h1>Hola Popular {posts.length}</h1>;
};

export default Popular;
