import Link from 'next/link';
import styles from './menu.module.css';
import Image from 'next/image';
import { menu } from '@/constants';
import { LanguageSwitch } from '@/components';

const Menu = () => (
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

export default Menu;