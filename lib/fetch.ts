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
	fetch(url, {
		method: method,
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
	})
		.then((res) => {
			loading = false;
			return [res.json(), error, loading];
		})
		.catch((err) => {
			error = true;
			loading = false;
			return [err, error, loading];
		});
};
