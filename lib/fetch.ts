export interface FetchProps {
	url: string;
	method?: string;
	body?: object;
	headers?: { [key: string]: string };
}

export const useFetch = async ({
	url,
	method = "GET",
	body,
	headers,
}: FetchProps) => {
	let error = false;
	let loading = true;
	try {
		const res = await fetch(url, {
			method: method,
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
		});
		const data = await res.json();
		loading = false;
		return [data, error, loading];
	} catch (err) {
		error = true;
		loading = false;
		return [null, error, loading];
	}
};
