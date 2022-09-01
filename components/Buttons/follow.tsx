/** @jsxImportSource @emotion/react */
import * as React from "react";
import { jsx, css } from "@emotion/react";
import { Add } from "@fdn-ui/icons-react";

export interface FollowProps {
	chonky?: boolean;
}

export const Follow = ({ chonky }: FollowProps) => {
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
		>
			<Add fill={"white"} />
			<p
				css={{
					fontSize: "1.2em",
					fontWeight: "bold",
				}}
			>
				Follow
			</p>
		</div>
	);
};
