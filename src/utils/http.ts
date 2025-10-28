type TFetchAPI = {
	method?: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
	body?: string | null;
	endpoint: string;
};

export const fetchAPI = async ({
	endpoint,
	body = null,
	method = 'GET',
}: TFetchAPI) => {
	const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
	const res = await fetch(endpoint, {
		method,
		body,
		headers: { 'x-api-key': apiKey },
	});
	const { success, data, message } = await res.json();
	return { res, success, data, message };
};
