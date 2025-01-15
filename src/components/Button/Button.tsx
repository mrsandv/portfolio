'use client'
import styles from './button.module.css';
import { ButtonHTMLAttributes } from "react"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export default function Button({ children, ...resProps }: IButton) {
  return <button className={styles.btn} {...resProps} >{children}</button>
}