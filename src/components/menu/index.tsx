'use client';
import { HomerIcon } from 'assets/icons';
import { useTheme } from 'context';
import Image from 'next/image';
import Link from 'next/link';
import { FaMoon, FaSun } from 'react-icons/fa';

export const menuItems = [
	{ href: '/blog', key: 'blog' },
	{ href: '/projects', key: 'projects' },
];

type TMode = 'fun' | 'normal';

type TMenuProps = {
	toggleMode: (mode: TMode) => void;
};

const Menu = ({ toggleMode }: TMenuProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className="bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 text-black flex items-center justify-between sm:p-2 p-4 h-[10vh] w-full">
			<Link href="/">
				<Image src="/logo.png" alt="Logo" width={80} height={80} priority />
			</Link>
			<div className="flex space-x-4">
				<button
					type="button"
					className="cursor-pointer mx-5"
					onClick={toggleTheme}
				>
					{theme === 'light' ? <FaMoon /> : <FaSun />}
				</button>
				<button
					disabled
					type="button"
					className="cursor-pointer mx-5"
					onClick={() => toggleMode('fun')}
				>
					<HomerIcon />
				</button>
			</div>
		</nav>
	);
};

export default Menu;
