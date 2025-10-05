'use client';
import { HomerIcon, MoonIcon, SunIcon } from 'assets/icons';
import { useTheme } from 'context';
import Image from 'next/image';
import Link from 'next/link';

// import { useLang } from 'hooks/useLang';

export const menuItems = [
	{ href: '/blog', key: 'blog' },
	{ href: '/projects', key: 'projects' },
];

type TMode = 'fun' | 'normal';

type TMenuProps = {
	toggleMode: (mode: TMode) => void;
};

const Menu = ({ toggleMode }: TMenuProps) => {
	// const { lang, setLang, t } = useLang();
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className="bg-zinc-100 dark:bg-zinc-950 dark:text-white text-black flex items-center justify-between p-4 h-[10vh] w-full">
			<Link href="/">
				<Image src="/logo.png" alt="Logo" width={80} height={80} priority />
			</Link>
			<div className="flex space-x-4">
				{/* {menuItems.map((item) => (
          <Link key={item.key} href={item.href}>
            {t(`menu.${item.key}`)}
          </Link>
        ))} */}
				<button
					type="button"
					className="cursor-pointer mx-5"
					onClick={toggleTheme}
				>
					{theme === 'light' ? <MoonIcon /> : <SunIcon />}
				</button>
				<button
					type="button"
					className="cursor-pointer mx-5"
					onClick={() => toggleMode('fun')}
				>
					<HomerIcon />
				</button>
				{/* <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
          <option value="es">🇲🇽</option>
          <option value="en">🇬🇧</option>
        </select> */}
			</div>
		</nav>
	);
};

export default Menu;
