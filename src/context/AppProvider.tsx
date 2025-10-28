'use client';
import { Menu } from 'components';
import HomerMode from 'components/homer';
import { Breadcrumb } from 'components/ui';
import { ThemeProvider } from 'context/';
import { usePathname } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { ToastContainer } from 'react-toastify';

type TMode = 'fun' | 'normal';

const AppProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<TMode>('normal');
	const pathname = usePathname();

	const toggleMode = () => {
		setMode((prevMode) => (prevMode === 'fun' ? 'normal' : 'fun'));
	};

	const isHome = pathname === '/';

	return (
		<ThemeProvider>
			<ToastContainer />
			{mode === 'fun' ? (
				<HomerMode toggleMode={toggleMode} />
			) : (
				<>
					<Menu toggleMode={toggleMode} />
					<main className="flex flex-col bg-white dark:bg-[#1f1f1f] min-h-[90vh] w-screen p-5">
						{!isHome && <Breadcrumb />}
						{children}
					</main>
				</>
			)}
		</ThemeProvider>
	);
};

export default AppProvider;
