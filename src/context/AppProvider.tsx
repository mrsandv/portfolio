'use client';
import { Menu } from 'components';
import HomerMode from 'components/homer';
import { ThemeProvider } from 'context/';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

type TMode = 'fun' | 'normal';

const AppProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<TMode>('normal');
	const pathname = usePathname();
	const router = useRouter();

	const toggleMode = () => {
		setMode((prevMode) => (prevMode === 'fun' ? 'normal' : 'fun'));
	};

	const isHome = pathname === '/';

	console.log({ pathname, isHome });
	return (
		<ThemeProvider>
			<ToastContainer />
			{mode === 'fun' ? (
				<HomerMode toggleMode={toggleMode} />
			) : (
				<>
					<Menu toggleMode={toggleMode} />
					<main className="flex flex-col bg-white dark:bg-[#1f1f1f] min-h-[90vh] w-screen p-5">
						{!isHome && (
							<section>
								<button
									type="button"
									onClick={() => router.push('/')}
									className="flex items-center gap-2 text-sm dark:text-zinc-200 hover:scale-105 transition-transform cursor-pointer"
								>
									<FaArrowLeft className="w-7 h-7" />
								</button>
							</section>
						)}
						{children}
					</main>
				</>
			)}
		</ThemeProvider>
	);
};

export default AppProvider;
