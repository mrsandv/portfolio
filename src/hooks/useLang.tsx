import { useEffect, useState } from 'react';

export type Lang = 'es' | 'en';
type Translations = { [key: string]: any };

const locales: Record<Lang, () => Promise<Translations>> = {
	en: () => import('locales/en.json').then((mod) => mod.default),
	es: () => import('locales/es.json').then((mod) => mod.default),
};

export function useLang(defaultLang: Lang = 'es') {
	const [lang, setLang] = useState<Lang>(defaultLang);
	const [translations, setTranslations] = useState<Translations>({});

	useEffect(() => {
		locales[lang]().then(setTranslations);
	}, [lang]);

	const t = (key: string): string => {
		const value = key.split('.').reduce((obj, k) => obj?.[k], translations);
		return typeof value === 'string' ? value : key;
	};

	return { lang, setLang, t };
}
