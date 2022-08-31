/** @jsxImportSource @emotion/react */
import * as React from "react";
import { jsx, css } from "@emotion/react";
import styles from "../styles/components/Pill.module.css";

export interface PillProps {
	children: React.ReactNode;
	type: "primary" | "secondary" | "transparent";
	className?: string;
}

export const Pill = ({ children, className, type }: PillProps) => {
	return (
		<div
			className={className}
			css={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "5rem",
				cursor: "pointer",
				boxSizing: "border-box",
				userSelect: "none",
				width: "8em",
				height: "1em",
				backgroundColor: type === "primary" ? "var(--hueletColor)" : "",
			}}
		>
			{children}
		</div>
	);
};
