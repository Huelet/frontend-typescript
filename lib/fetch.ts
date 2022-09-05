export interface FetchProps {
	url: string;
	method?: string;
	body?: object;
	headers?: { [key: string]: string };
}

export const useFetch = (props: FetchProps) => {
	let error = false;
	let loading = true;
	fetch(props.url, {
		method: props.method,
		body: JSON.stringify(props.body),
		headers: {
			"Content-Type": "application/json",
			...props.headers,
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
