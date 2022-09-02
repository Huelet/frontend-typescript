export interface FetchProps {
	url: string;
	method?: string;
	body?: string;
	headers?: { [key: string]: string };
}

export const fetcher = ({ url, method = "GET", body, headers }: FetchProps) =>
	fetch(url, {
		method: method,
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
	}).then((res) => res.json());
