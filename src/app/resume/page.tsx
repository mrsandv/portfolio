'use client';

import { Button } from 'components/ui';
import { useState } from 'react';

type TLang = 'english' | 'spanish';

const ResumePage = () => {
	const [language, setLanguage] = useState<TLang>('english');

	return (
		<div className="">
			<div className="flex justify-end">
				<Button
					onClick={() => {
						if (language === 'english') {
							setLanguage('spanish');
						} else {
							setLanguage('english');
						}
					}}
				>
					{language === 'spanish' ? 'Engish' : 'Spanish'}
				</Button>
			</div>
			<iframe
				className=" h-[80vh] w-full"
				src={
					language === 'english'
						? '/resume.pdf#zoom=page-width'
						: '/cv.pdf#zoom=page-width'
				}
				title="English resume"
			/>
		</div>
	);
};

export default ResumePage;
