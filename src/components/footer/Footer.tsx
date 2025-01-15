import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      footer
      <br />
      This page is made with Next.js, Tailwind, KUDOS of this template to <a className='' href='https://www.figma.com/@aqsam'>@aqsam</a>
    </footer>
  )
}