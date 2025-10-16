'use client';
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

type TTheme = 'dark' | 'light';

type TContext = { theme: TTheme; toggleTheme: () => void };

const ThemeContext = createContext<TContext | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<TTheme>('light');
	const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

	useEffect(() => {
		const root = document.documentElement;

		if (theme === 'dark') root.classList.add('dark');
		else root.classList.remove('dark');
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error('useTheme must be used within ThemeProvider');
	}
	return ctx;
};
