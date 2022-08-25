/** @jsxImportSource @emotion/react */
import * as React from "react";
import Link from "next/link";
import {
	Accessibility,
	Copy,
	Help,
	Notepad,
	PaintBrush,
	Send,
	Settings,
	Subtitles,
	VideoCamera,
} from "@fdn-ui/icons-react";
import { useEffect, useState } from "react";
import { Menu } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSound } from "use-sound";
import { Search } from "./search";
import { css, jsx } from "@emotion/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export interface HeaderProps {
	username?: string;
}

export const Header = ({ username }: HeaderProps) => {
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(true);
	const [playBgSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Background.wav",
		{ volume: 1 }
	);
	const [playClickSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Hardware%20Fail.wav",
		{ volume: 1 }
	);
	const [pfp, setPfp] = useState("");

	const router = useRouter();

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(
				`https://api.huelet.net/auth/pfp?username=${username}`
			);
			const data = await res.json();
			setPfp(data.pfp);
			setLoggedIn(true);
			setLoading(false);
		};
		if (username) {
			getData();
		} else {
			setLoading(false);
		}
	}, [username]);
	return (
		<SkeletonTheme baseColor="#4E4E4E" highlightColor="#686868">
			<div
				css={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					backgroundColor: "#1A1B1E",
					width: "100%",
					height: "5vh",
				}}
			>
				<div
					onClick={() => playBgSound()}
					css={{
						cursor: "pointer",
					}}
				>
					<Link href="/explore" passHref={true}>
						<Image
							src="https://cdn.huelet.net/assets/logo.png"
							alt="Huelet Logo"
							width={42}
							height={42}
							css={{
								cursor: "pointer",
								borderRadius: "50%",
							}}
							loader={() => "https://cdn.huelet.net/assets/logo.png"}
						/>
					</Link>
				</div>
				<Search />
				<div
					css={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div className="hover cursor">
						<a href="https://dash.huelet.net">
							<VideoCamera fill={"white"} width={42} height={40} />
						</a>
					</div>
					<div className="hover cursor" onClick={() => playClickSound()}>
						<Link href="/auth/settings" passHref={true}>
							<div>
								<Settings fill={"white"} width={42} height={40} />
							</div>
						</Link>
					</div>
					{loading ? (
						<Skeleton circle={true} width={42} height={42} />
					) : (
						<>
							{loggedIn ? (
								<div
									className="avatar--container hover cursor"
									onClick={() => playClickSound()}
								>
									<Menu
										control={
											<img
												src={
													pfp
														? pfp
														: "https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png"
												}
												css={{
													border: "2px solid var(--hueletColor)",
													borderRadius: "50%",
													padding: "2px",
												}}
												alt={
													username
														? `${username}'s profile picture`
														: "Default profile picture"
												}
												width={42}
												height={40}
											/>
										}
									>
										<Menu.Label>Your account</Menu.Label>
										<Menu.Item
											icon={<Settings fill={"white"} />}
											component={NextLink}
											href="/auth/settings"
										>
											Settings
										</Menu.Item>
										<Menu.Item
											icon={<Send fill={"white"} />}
											component={NextLink}
											href="/auth/invite"
										>
											Invite
										</Menu.Item>
										<Menu.Item
											icon={<PaintBrush fill={"white"} />}
											component={NextLink}
											href="/auth/settings/view"
										>
											Customization
										</Menu.Item>
										<Menu.Item
											icon={<VideoCamera fill={"white"} />}
											component={NextLink}
											href="https://dash.huelet.net/"
										>
											Your Videos
										</Menu.Item>
										<Menu.Item icon={<Subtitles fill={"white"} />} disabled>
											Huelet Premium (Coming Soon)
										</Menu.Item>
										<Menu.Item
											icon={<Accessibility fill={"white"} />}
											component={NextLink}
											href="/auth/settings/accessibility"
										>
											Accessibility Settings
										</Menu.Item>
										<Menu.Label>Help</Menu.Label>
										<Menu.Item
											icon={<Help fill={"white"} />}
											component={NextLink}
											href="https://docs.huelet.net/"
										>
											Help Center
										</Menu.Item>
										<Menu.Item
											icon={<Notepad fill={"white"} />}
											component={NextLink}
											href="https://huelet.net/s/report"
										>
											Report a problem
										</Menu.Item>
										<Menu.Label>Your data</Menu.Label>
										<Menu.Item
											icon={<Copy fill={"white"} />}
											component={NextLink}
											href="/auth/data"
										>
											Your data in Huelet
										</Menu.Item>
									</Menu>
								</div>
							) : (
								<>
									<div
										css={css({
											display: "flex",
											justifyContent: "space-evenly",
											alignItems: "center",
											flexDirection: "row",
											background: "transparent",
											borderRadius: "5px",
											border: "1px solid #7600ff",
											opacity: "1",
											color: "#eee",
											cursor: "pointer",
											margin: 0,
											paddingLeft: "1.5em",
											paddingRight: "1.5em",
											outline: "0",

											"&:hover": {
												background: "rgba(0, 0, 0, 0.1)",
											},
										})}
										onClick={() => {
											playClickSound();
											router.push("/auth/in");
										}}
									>
										Log In
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</SkeletonTheme>
	);
};
