"use client"
import Link from "next/link";
import { useLang, Lang } from "hooks/useLang";
import Image from "next/image";

export const menuItems = [
  { href: "/blog", key: "blog" },
  { href: "/projects", key: "projects" },
];

const Menu = () => {
  const { lang, setLang, t } = useLang();

  return <nav className="bg-zinc-950 flex items-center justify-between p-4 h-[15vh] w-full">
    <Link href="/">
      <Image src="/logo.png" alt="Logo" width={100} height={100} priority />
    </Link>
    <div className="flex space-x-4">
      {menuItems.map(item => (
        <Link key={item.key} href={item.href}>
          {t(`menu.${item.key}`)}
        </Link>
      ))}
    </div>
    <div>
      <select value={lang} onChange={e => setLang(e.target.value as Lang)}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  </nav>
}

export default Menu;