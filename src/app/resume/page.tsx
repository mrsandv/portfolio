'use client';
import { resume } from 'constants/resume';
import { useState } from 'react';

type TLangs = 'en' | 'es';

const ResumePage = () => {
	const [lang, setLang] = useState<TLangs>('en');
	const { name, lastName, contactInfo, locales } = resume;
	const t = locales[lang];

	return (
		<div className="min-h-screen dark:text-zinc-100 bg-stone-100 rounded-lg shadow-sm shadow-stone-500/40 hover:shadow-rose-800/30 dark:bg-zinc-800 dark:border-gray-700 text-gray-800 p-8 max-w-3xl mx-auto select-none">
			<div className="flex justify-end mb-4 gap-4">
				<a
					download
					className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:text-black cursor-pointer"
					href={t.link.url}
				>
					{t.link.name}
				</a>
				<button
					type="button"
					onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
					className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:text-black cursor-pointer"
				>
					{lang === 'en' ? 'ES 🇲🇽' : 'EN 🇬🇧'}
				</button>
			</div>

			<h1 className="text-3xl font-bold mb-5">
				{name.toUpperCase()} {lastName.toUpperCase()}
			</h1>
			<ul className="text-sm mb-6">
				{Object.entries(contactInfo).map(([key, value]) => (
					<li key={key}>
						<a href={value.value}>{value.text}</a>
					</li>
				))}
			</ul>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-5">{t.headers.skills}</h2>
				{Object.entries(t.skills).map(([key, skill]) => (
					<p className="text-sm" key={key}>
						<strong>{skill.name}:</strong> {skill.options.join(', ')}
					</p>
				))}
			</section>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-5">{t.headers.experience}</h2>
				{Object.entries(t.experience).map(([key, exp]) => (
					<div key={key} className="mb-3">
						<div className="text-sm flex justify-between w-full my-4">
							<p className="font-semibold">
								{exp.title} — {exp.company}
							</p>
							<p className="text-sm italic">
								{exp.startDate} - {exp.endDate}
							</p>
						</div>
						<ul className="list-disc list-inside">
							{exp.responsibilities.map((r) => (
								<li className="ml-5 text-xs mb-2" key={r.id}>
									{r.text}
								</li>
							))}
						</ul>
					</div>
				))}
			</section>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-4">{t.headers.education}</h2>
				{Object.entries(t.education).map(([key, edu]) => (
					<p className="text-sm" key={key}>
						<strong>{edu.degree}</strong> — {edu.institution} ({edu.startYear}–
						{edu.endYear})
					</p>
				))}
			</section>

			<section className="mb-6">
				<h2 className="text-xl font-semibold mb-4">{t.headers.languages}</h2>
				<ul>
					{t.languages.map((l) => (
						<li className="text-sm" key={l.name}>
							{l.name} — {l.level}
						</li>
					))}
				</ul>
			</section>

			<section>
				<h2 className="text-xl font-semibold mb-4">{t.headers.interests}</h2>
				<p className="text-sm">{t.interests.join(', ')}</p>
			</section>
		</div>
	);
};

export default ResumePage;
