import { ReactNode } from 'react';
import styles from './workspace.module.css';

type TWorkspace = {
  children: ReactNode;
}

export default function Workspace({ children }: TWorkspace) {
  return (
    <main className={styles.wrapper}>
      {children}
    </main>
  )
}