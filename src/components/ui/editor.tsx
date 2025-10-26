'use client';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect, useMemo, useState } from 'react';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useTheme } from 'context';

type TEditor = {
	onChange?: (content: string) => void;
	content: string | undefined;
	className?: string;
	editable?: boolean;
};

const SkeletonEditor = ({ className = '' }: { className?: string }) => {
	return (
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
};

const Editor = ({
	content,
	onChange,
	className = '',
	editable = true,
}: TEditor) => {
	const { theme } = useTheme();
	const editor = useCreateBlockNote();

	const [isContentReady, setIsContentReady] = useState(false);

	const parsedContent = useMemo(() => {
		if (!content) return null;
		return JSON.parse(content);
	}, [content]);

	useEffect(() => {
		if (!editor) return;
		if (!parsedContent) {
			setIsContentReady(false);
			return;
		}

		try {
			editor.replaceBlocks(editor.document, parsedContent);
			setIsContentReady(true);
		} catch (e) {
			console.error('Failed to set initial content on BlockNote editor:', e);
			setIsContentReady(false);
		}
	}, [editor, parsedContent]);

	const handleChange = () => {
		if (!editor) return;
		try {
			const json = editor.document;
			onChange?.(JSON.stringify(json));
		} catch (e) {
			console.error('onChange failed:', e);
		}
	};

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
