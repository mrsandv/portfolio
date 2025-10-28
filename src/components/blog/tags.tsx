import { Chip } from 'components/ui';
import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { TTag } from 'types/posts';
import { fetchAPI } from 'utils/http';

type TagProps = {
	selected?: string;
	handleFilterByTag: (tag: TTag) => void;
};

const Tags = ({ handleFilterByTag, selected }: TagProps) => {
	const [tags, setTags] = useState<TTag[]>([]);
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const fetchTags = useCallback(async () => {
		const { success, message, data, res } = await fetchAPI({
			endpoint: '/api/blog/tags',
		});

		if (!res.ok || !success) {
			toast.error(message);
			return;
		}
		setTags(data);
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
		<div className="flex flex-col h-full w-full gap-2">
			{tags.map((tag) => (
				<Chip
					active={activeTag === tag._id}
					onClick={() => handleFilterByTag(tag)}
					text={tag.displayName}
					count={tag.count}
					key={tag._id}
				/>
			))}
		</div>
	);
};

export default memo(Tags);
