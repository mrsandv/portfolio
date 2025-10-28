import { fetchAPI } from './http';

export const humanFormatDate = (date: string, locale: string = 'es') => {
	if (locale === 'en') return `${date} en ingles`;
	return date.slice(0, 10);
};

export const logoutSession = async () => {
	try {
		const { success, message, res } = await fetchAPI({
			endpoint: '/api/logout',
			method: 'POST',
		});

		if (!res.ok || !success) {
			console.log(message);
		}
	} catch (err) {
		console.log(err);
	}
};
