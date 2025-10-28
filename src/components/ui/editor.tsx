'use client';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect, useMemo, useState } from 'react';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useStore } from 'context';

type TEditor = {
	onChange?: (content: string) => void;
	content: string | undefined;
	className?: string;
	editable?: boolean;
	autosaveInterval?: number;
};

const SkeletonEditor = ({ className = '' }: { className?: string }) => (
	<div
		className={
			'rounded-md border border-dashed p-6 animate-pulse selection-none ' +
			className
		}
	>
		<div className="h-6 w-3/4 bg-gray-200 mb-4 rounded" />
		<div className="h-4 w-full bg-gray-200 mb-2 rounded" />
		<div className="h-4 w-5/6 bg-gray-200 mb-2 rounded" />
		<div className="h-4 w-2/3 bg-gray-200 rounded" />
	</div>
);

const Editor = ({
	content,
	onChange,
	className = 'w-full',
	editable = true,
	autosaveInterval = 3000,
}: TEditor) => {
	const { theme } = useStore();
	const editor = useCreateBlockNote();
	const [isContentReady, setIsContentReady] = useState(false);
	const [localContent, setLocalContent] = useState<string | undefined>(content);

	const parsedContent = useMemo(() => {
		if (!content) return null;
		try {
			return JSON.parse(content);
		} catch {
			return null;
		}
	}, [content]);

	useEffect(() => {
		if (!editor) return;
		try {
			if (parsedContent) editor.replaceBlocks(editor.document, parsedContent);
			setIsContentReady(true);
		} catch (e) {
			console.error('Failed to set content on BlockNote editor:', e);
			setIsContentReady(true);
		}
	}, [editor, parsedContent]);

	const handleChange = () => {
		if (!editor) return;
		try {
			const json = JSON.stringify(editor.document);
			setLocalContent(json);
		} catch (e) {
			console.error('onChange failed:', e);
		}
	};

	useEffect(() => {
		if (!onChange || !autosaveInterval) return;
		const interval = setInterval(() => {
			if (localContent) onChange(localContent);
		}, autosaveInterval);
		return () => clearInterval(interval);
	}, [localContent, onChange, autosaveInterval]);

	return (
		<div className={className}>
			{!isContentReady ? (
				<SkeletonEditor />
			) : (
				<BlockNoteView
					theme={theme}
					editor={editor}
					editable={editable}
					onChange={handleChange}
				/>
			)}
		</div>
	);
};

export default Editor;
