import { TProjects as TCard } from '@/constants/'
import styles from './card.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ title, description, href, media }: TCard) {
  return (
    <div className={styles.card} >
      <h3>{title}</h3>
      <p>{description}</p>
      <Image width={50} height={50} alt={description} src={media} />
      <Link href={href}>Ir a...</Link>
    </div>
  )
}