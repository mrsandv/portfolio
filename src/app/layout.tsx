import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Menu, Footer } from "components/";

const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space-hole Tech by  by mrsan",
  description: "My personal portfolio and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmSans.variable} flex flex-col min-h-screen bg-white`}
      >
        <Menu />
        <main className="flex flex-col bg-zinc-100 min-h-[80vh] p-2">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
