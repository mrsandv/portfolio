import Link from 'next/link';
import styles from './menu.module.css';
import Image from 'next/image';
import { LanguageSwitch } from '@/components';

export default async function Menu() {
  const response = await fetch(`${process.env.CMS_SERVICES}/api/menu${process.env.NODE_ENV !== "production" ? "?draft=true" : ""}`, {
		headers: {
      "Authorization": `keys API-Key ${process.env.CMS_API_KEY}`
		}
	});

  type TMenu = {
    id: string;
    name: string;
    path: string;
  }
  
  const {docs: menu}:{ docs: TMenu[] }  = await response.json()
  return (
    <header className={styles.wrapper}>
      <Link href="/" >
        <Image height={80} width={160} src="/logo.svg" alt="logo of mrsan portfolio" className={styles.logo} />
      </Link>
      <ul className={styles.list}>
        {menu.map((entry) => <li key={entry.id} className={styles.item}>
          <Link className={styles.entry} href={entry.path}>{entry.name}</Link>
        </li>)}
        <LanguageSwitch />
      </ul>
    </header>
  )
}