import { Menu, Footer, Workspace } from "@/components";
import { Suspense } from "react";
import "./globals.css";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menu />
      <Workspace >
        <Suspense fallback={<>Loading...</>}>
          {children}
        </Suspense>
      </Workspace>
      <Footer />
    </>
  );
}
