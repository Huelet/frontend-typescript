/** @jsxImportSource @emotion/react */
import * as React from "react";
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { Search as SearchIcon } from "@fdn-ui/icons-react";

export interface SearchProps {
	className?: string;
	chonky?: boolean;
	placeholder?: string;
	defaultValue?: string;
	quickSearch?: boolean;
}

export const Search = ({
	className,
	chonky,
	placeholder,
	defaultValue,
	quickSearch,
}: SearchProps) => {
	return (
		<div
			className={className ? className : ""}
			css={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<form action="/s" method="get">
				<input
					css={{
						width: "25rem",
						height: "42px",
						background: "transparent",
						color: "#fff",
						transition: "200ms ease-in-out",
						border: "rgba(15, 119, 255, 0.733) solid 2px",
						borderRadius: "0.75em",

						"@media (max-width: 768px)": {
							width: "74%",
						},
					}}
					type="text"
					name="q"
					placeholder={placeholder ? placeholder : "Search"}
					defaultValue={defaultValue ? defaultValue : ""}
					autoComplete="off"
					autoCorrect="off"
				/>
				<button
					className="cursor"
					type="submit"
					aria-label="Search"
					title="Search"
					css={{
						height: "42px",
						border: "none",
						background: "var(--hueletColor)",
						borderRadius: "0.75em",
						"@media (max-width: 768px)": {
							width: "15%",
						},
					}}
				>
					<div
						css={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							height: "42px",
							width: "42px",
							border: "none",
							background: "var(--hueletColor)",
							borderRadius: "0.75em",
						}}
					>
						<SearchIcon fill={"white"} />
					</div>
				</button>
			</form>
		</div>
	);
};
