export const humanFormatDate = (date: string, locale: string = 'es') => {
	if (locale === 'en') return `${date} en ingles`;
	return date.slice(0, 10);
};
