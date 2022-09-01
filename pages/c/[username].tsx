/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import {
	Avatar as AvatarIcon,
	BulletList,
	Calendar,
	Location,
} from "@fdn-ui/icons-react";
import { Header } from "../../components/header";
import { Follow } from "../../components/Buttons/follow";
import { Avatar } from "../../components/avatar";
import { jsx, css } from "@emotion/react";
import { VideoCard } from "../../components/video-card";

const ViewCreator: NextPage = () => {
	const [user, setUser] = useState<any>({});
	const [videos, setVideos] = useState<any[]>([]);
	const [colors, setColors] = useState<any[]>([]);
	const [response, setResponse] = useState<any>(<></>);
	const router = useRouter();
	const { username } = router.query;
	const uname = username?.toString().replace("@", "");
	useEffect(() => {
		const getData = async () => {
			const userData = await fetch(
				`https://api.huelet.net/auth/user?username=${uname}`
			);
			const userDataJSON = await userData.json();
			setUser(userDataJSON.data);
			setColors(userDataJSON.data?.avatarColor);
		};
		getData();
	}, [uname]);

	useEffect(() => {
		const getVideos = async () => {
			const videoData = await fetch(
				`https://api.huelet.net/videos/search/fromcreator?creatorId=${user?.uid}`
			);
			const videoDataJSON = await videoData.json();
			setVideos(videoDataJSON.data);
		};
		getVideos();
	}, [user]);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			setResponse(
				videos.map(({ vuid }) => {
					return (
						<div key={vuid}>
							<VideoCard vuid={vuid} />
						</div>
					);
				})
			);
		}
		return () => {
			mounted = false;
		};
	}, [videos]);
	return (
		<div id="klausen">
			<Header username="" />
			<div
				css={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0.5rem",
				}}
			>
				<img
					src={
						user?.header
							? user?.header
							: "https://cdn.huelet.net/assets/logo.png"
					}
					alt="Header"
					css={{
						width: "100vw",
						height: "350px",
						filter: user?.header ? undefined : "blur(400em)",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",

						"@media screen and (max-width: 1400px)": {
							height: "300px",
						},

						"@media screen and (max-width: 600px)": {
							height: "250px",
						},

						"@media screen and (max-width: 400px)": {
							height: "200px",
						},
					}}
				/>
			</div>
			<div
				css={css({
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					color: "#FFFFFF",
					background: "rgba(255, 255, 255, 0.20)",
					border: "0.1em solid rgba(0, 0, 0, 0.15)",
					borderRadius: "10px",
					transition: "0.6s",
					padding: "2em",
					boxShadow: `0px -120px 120px 0px ${
						colors
							? colors[Math.floor(Math.random() * colors.length)]
							: "var(--hueletSecondaryColor)"
					} !important`,

					"@media screen and (max-width: 400px)": {
						boxShadow: `0px -64px 69px 0px ${
							colors
								? colors[Math.floor(Math.random() * colors.length)]
								: "var(--hueletSecondaryColor)"
						} !important`,
					},
				})}
			>
				<div
					css={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<div css={{ padding: "1em" }}>
						<Avatar username={uname} dimensions={128} />
					</div>
					<div
						css={{
							display: "flex",
							flexDirection: "column",
							padding: "0.1em",
						}}
					>
						<h2
							css={{
								fontSize: "2em",
							}}
						>
							{username ? uname : "Loading..."}
						</h2>
						<div
							css={{
								flexDirection: "column",
							}}
						>
							<div
								css={css({
									display: "flex",
									flexDirection: "row",
								})}
							>
								<BulletList fill="white" />
								<p
									dangerouslySetInnerHTML={{
										__html: user?.bio ? user?.bio : "Loading...",
									}}
								></p>
							</div>
							<div
								css={css({
									display: "flex",
									flexDirection: "row",
								})}
							>
								<Calendar fill="white" />
								<p>{`Joined ${new Intl.DateTimeFormat("en-US", {
									month: "long",
								}).format(
									new Date(
										user?.createdAt ? Math.floor(user?.createdAt * 1000) : 0
									)
								)} ${new Date(
									user?.createdAt ? Math.floor(user?.createdAt * 1000) : 0
								).getFullYear()}`}</p>
							</div>
							<div
								css={css({
									display: "flex",
									flexDirection: "row",
								})}
							>
								<AvatarIcon fill="white" />
								<p>{user?.pronouns?.join("/")}</p>
							</div>
							<div
								css={css({
									display: "flex",
									flexDirection: "row",
								})}
							>
								<Location fill={"white"} />
								<p>{user?.location}</p>
							</div>
						</div>
					</div>
				</div>
				<div></div>
				<div
					css={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Follow username={user?.username} />
				</div>
			</div>
			<div
				css={css({
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
				})}
			>
				{response}
			</div>
		</div>
	);
};

export default ViewCreator;
