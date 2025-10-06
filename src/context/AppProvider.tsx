'use client';
import { Menu } from 'components';
import HomerMode from 'components/homer';
import { ThemeProvider } from 'context/';
import { type ReactNode, useState } from 'react';
import { ToastContainer } from 'react-toastify';

type TMode = 'fun' | 'normal';

const AppProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<TMode>('normal');

	const toggleMode = () => {
		setMode((prevMode) => (prevMode === 'fun' ? 'normal' : 'fun'));
	};

	return (
		<ThemeProvider>
			<ToastContainer />
			{mode === 'fun' ? (
				<HomerMode toggleMode={toggleMode} />
			) : (
				<>
					<Menu toggleMode={toggleMode} />
					<main className="flex flex-col bg-zinc-300 dark:bg-zinc-700 min-h-[90vh] w-screen p-5">
						{children}
					</main>
				</>
			)}
		</ThemeProvider>
	);
};

export default AppProvider;
