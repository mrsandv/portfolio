import { Chip } from 'components/ui';
import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { TTag } from 'types/posts';

type TagProps = {
	selected?: string;
	handleFilterByTag: (tag: string) => void;
};

const Tags = ({ handleFilterByTag, selected }: TagProps) => {
	const [tags, setTags] = useState<TTag[]>([]);
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const fetchTags = useCallback(async () => {
		const res = await fetch('/api/blog/tags');
		const { success, message, data } = await res.json();
		if (success) {
			setTags(data);
		} else {
			toast.error(message);
		}
	}, []);

	useEffect(() => {
		fetchTags();
	}, [fetchTags]);

	useEffect(() => {
		if (selected) {
			setActiveTag(selected);
		} else {
			setActiveTag(null);
		}
	}, [selected]);

	return (
		<div className=" flex gap-4 flex-wrap">
			{tags.map((tag) => (
				<Chip
					active={activeTag === tag._id}
					onClick={() => handleFilterByTag(tag._id)}
					text={tag.displayName}
					count={tag.count}
					key={tag._id}
				/>
			))}
		</div>
	);
};

export default memo(Tags);
