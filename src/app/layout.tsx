import AppProvider from 'context/AppProvider';
import type { ReactNode } from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';

const ibmSans = IBM_Plex_Sans({
	variable: '--font-ibm-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Space-hole Tech by  by mrsan',
	description: 'My personal portfolio and blog',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${ibmSans.variable} flex flex-col min-h-screen bg-white dark:bg-zinc-800`}
			>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
