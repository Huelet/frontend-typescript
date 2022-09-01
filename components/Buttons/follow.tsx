/** @jsxImportSource @emotion/react */
import * as React from "react";
import { jsx, css, keyframes } from "@emotion/react";
import { Add, Close } from "@fdn-ui/icons-react";
import { useRouter } from "next/router";

export interface FollowProps {
	username: string;
	chonky?: boolean;
}

export const Follow = ({ username, chonky }: FollowProps) => {
	const [followed, setFollowed] = React.useState(false);

	React.useEffect(() => {
		if (typeof username !== "undefined" && localStorage.getItem("username")) {
			fetch(`https://api.huelet.net/users/info/followers?username=${username}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);

					if (data?.following?.includes(localStorage.getItem("username"))) {
						setFollowed(true);
					}
				});
		}
	}, [username]);

	const router = useRouter();
	return (
		<div
			css={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "transparent",
				border: "var(--hueletColor) 1px solid",
				borderRadius: "5px",
				padding: "0.75em",
				cursor: "pointer",
			}}
			onClick={async () => {
				if (localStorage.getItem("token")) {
					const resp = await fetch(
						`https://api.huelet.net/users/interact/follow?username=${localStorage.getItem(
							"username"
						)}&userToFollow=${username}`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					);

					if (resp.status === 200) {
						setFollowed(!followed);
					}
				} else {
					router.push("/auth/in");
				}
			}}
		>
			<Add
				fill={"white"}
				css={{
					transform: followed ? "rotate(45deg)" : "rotate(0deg)",
					animation: `${
						followed
							? keyframes({
									from: { transform: "rotate(0deg)" },
									to: { transform: "rotate(405deg)" },
							  })
							: keyframes({
									from: { transform: "rotate(405deg)" },
									to: { transform: "rotate(0deg)" },
							  })
					} 1000ms linear`,
					userSelect: "none",
				}}
			/>
			<p
				css={{
					fontSize: "1.2em",
					fontWeight: "bold",
					userSelect: "none",
				}}
			>
				Follow
			</p>
		</div>
	);
};
