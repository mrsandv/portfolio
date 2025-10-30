import AppProvider from 'context/AppProvider';
import type { ReactNode } from 'react';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMono = IBM_Plex_Mono({
	weight: '400',
	variable: '--font-ibm-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Space-hole Tech',
	description: 'Marco Sandoval portfolio and blog',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${ibmMono.variable} flex flex-col min-h-screen bg-white dark:bg-zinc-800`}
			>
				<AppProvider>{children}</AppProvider>
				<Analytics />
			</body>
		</html>
	);
}
