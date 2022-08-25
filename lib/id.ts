export interface ID {
	rounds?: number;
}

export const useID = ({ rounds = 4 }: ID) => {
	// credit to @dothq/id (https://github.com/dothq/id)
	return [...Array(rounds)]
		.map((i) =>
			Math.round(Date.now() + Math.random() * Date.now()).toString(36)
		)
		.join("");
};
