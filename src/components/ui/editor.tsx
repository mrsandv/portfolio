'use client';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useTheme } from 'context';

type TEditor = {
	onChange?: (content: string) => void;
	content: string;
	className?: string;
	editable?: boolean;
};

const Editor = ({
	content,
	onChange,
	className = '',
	editable = true,
}: TEditor) => {
	const { theme } = useTheme();

	const editor = useCreateBlockNote({
		initialContent: content ? JSON.parse(content) : undefined,
	});

	return (
		<div className={className}>
			<BlockNoteView
				theme={theme}
				editor={editor}
				editable={editable}
				onChange={onChange}
			/>
		</div>
	);
};

export default Editor;
