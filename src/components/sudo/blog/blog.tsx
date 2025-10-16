'use client';
import { Button, Card, Dialog, Modal } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { TPost } from 'types/posts';
import PostForm from './PostForm';

type TModalState =
	| { type: 'none' }
	| { type: 'create' }
	| { type: 'edit'; post: TPost }
	| { type: 'delete'; post: TPost };

const BlogWrapper = () => {
	const [posts, setPosts] = useState<TPost[]>([]);
	const [modal, setModal] = useState<TModalState>({ type: 'none' });

	const fetchPosts = useCallback(async () => {
		const res = await fetch('/api/blog');
		if (res.ok) {
			const { data, success, message } = await res.json();
			if (success) {
				setPosts(data);
			} else {
				console.error(message);
			}
		}
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const handleDelete = async () => {
		if (modal.type !== 'delete') return;

		const res = await fetch(`/api/blog/${modal.post._id}`, {
			method: 'DELETE',
		});
		const { success, message } = await res.json();

		if (!success || !res.ok) {
			toast.error(message || 'Something went wrong');
			return;
		}

		toast.success(message);
		fetchPosts();
		setModal({ type: 'none' });
	};

	return (
		<div className="w-full">
			<div className="flex justify-end items-center w-full mb-5">
				<Button
					variant="accent"
					onClick={() => {
						setModal({ type: 'create' });
					}}
				>
					Add post
				</Button>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{posts.map((post) => (
					<Card
						key={post._id}
						title={post.title}
						img={post.image}
						content={
							<div className="flex w-full justify-between">
								<Button onClick={() => setModal({ type: 'edit', post: post })}>
									<FaEdit className="w-4 h-4" />
								</Button>
								<Button
									variant="danger"
									onClick={() => setModal({ type: 'delete', post })}
								>
									<FaTrash className="w-4 h-4" />
								</Button>
							</div>
						}
						description={post.subtitle}
					/>
				))}
			</div>
			{modal.type === 'create' && (
				<Modal
					size="full"
					title="New post"
					isOpen
					onClose={() => setModal({ type: 'none' })}
				>
					<PostForm mode="create" onSuccess={fetchPosts} />
				</Modal>
			)}
			{modal.type === 'edit' && (
				<Modal
					title={`Edit: ${modal.post.title}`}
					isOpen
					onClose={() => setModal({ type: 'none' })}
				>
					<PostForm post={modal.post} mode="edit" onSuccess={fetchPosts} />
				</Modal>
			)}
			{modal.type === 'delete' && (
				<Dialog
					variant="danger"
					title={`Delete: ${modal.post.title}`}
					content="Are you sure you want to delete this post?"
					isOpen
					confirmText="Yes, delete it."
					onClose={() => setModal({ type: 'none' })}
					onConfirm={handleDelete}
				/>
			)}
		</div>
	);
};

export default BlogWrapper;
