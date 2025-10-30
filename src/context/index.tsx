'use client';
import { useRouter } from 'next/navigation';
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { logoutSession } from 'utils/misc';

type TTheme = 'dark' | 'light';

type TUser = {
	rol: string;
	name: string;
};

type TContext = {
	theme: TTheme;
	toggleTheme: () => void;
	currentUser: TUser | null;
	login: (user: TUser) => void;
	logout: () => void;
};

const AppContext = createContext<TContext | null>(null);

export const AppStoreProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const [theme, setTheme] = useState<TTheme>('dark');
	const [currentUser, setCurrentUser] = useState<TUser | null>(null);

	const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
	const login = (user: TUser) => setCurrentUser(user);
	const logout = async () => {
		await logoutSession();
		setCurrentUser(null);
		router.push('/login');
	};

	useEffect(() => {
		const root = document.documentElement;

		if (theme === 'dark') root.classList.add('dark');
		else root.classList.remove('dark');
	}, [theme]);

	return (
		<AppContext.Provider
			value={{ theme, toggleTheme, currentUser, login, logout }}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useStore = () => {
	const ctx = useContext(AppContext);
	if (!ctx) {
		throw new Error('useStore must be used within AppProvider');
	}
	return ctx;
};
