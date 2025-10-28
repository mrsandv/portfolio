'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumbs = () => {
	const pathname = usePathname();
	const segments = pathname.split('/').filter(Boolean);

	return (
		<nav className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-200">
			<Link href="/" className="hover:underline">
				Home
			</Link>

			{segments.map((segment, i) => {
				const href = `/${segments.slice(0, i + 1).join('/')}`;
				const label =
					segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

				return (
					<span key={href} className="flex items-center gap-2">
						<FaChevronRight className="w-3 h-3" />
						<Link href={href} className="hover:underline">
							{label}
						</Link>
					</span>
				);
			})}
		</nav>
	);
};

export default Breadcrumbs;
