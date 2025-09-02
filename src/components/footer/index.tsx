import Link from 'next/link';

export default function Footer() {
  return (<footer className="text-white bg-zinc-800 flex items-center justify-center p-4 h-[5vh]">
    <Link
      className="flex items-center hover:"
      href="/"
    >
      mrsan
    </Link>
    <Link href="/sudo">🔮</Link>
  </footer>)
}