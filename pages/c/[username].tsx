/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import styles from "../../styles/Creator.module.css";
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
import { ColorExtractor } from "react-color-extractor";
import { jsx, css } from "@emotion/react";
import { VideoCard } from "../../components/video-card";

const ViewCreator: NextPage = () => {
	const [user, setUser] = useState<any>({});
	const [videos, setVideos] = useState<any[]>([]);
	const [colors, setColors] = useState<any[]>([]);
	const [response, setResponse] = useState<any>(<></>);
	const mounted: any = useRef(false);
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

			const videoData = await fetch(
				`https://api.huelet.net/videos/search/fromcreator?creatorId=${userDataJSON.data?.uid}`
			);
			const videoDataJSON = await videoData.json();
			setVideos(videoDataJSON.data);
		};
		getData();
	}, [uname]);

	useEffect(() => {
		if (mounted.current) {
			setResponse(
				videos.map(({ vuid }) => {
					return (
						<div key={vuid}>
							<VideoCard vuid={vuid} />
						</div>
					);
				})
			);
		} else {
			mounted.current = true;
		}
	}, [videos]);
	return (
		<div id="klausen">
			<Header username="" />
			<ColorExtractor
				src={user?.avatar}
				getColors={(colors) => {
					setColors(colors);
				}}
			/>
			<div className={`${styles.creatorHeader}`}>
				<img
					src={
						user?.header
							? user?.header
							: "https://cdn.huelet.net/assets/logo.png"
					}
					alt="Header"
					className={`${
						user?.header
							? styles.creatorHeaderImage
							: styles.creatorHeaderImageDefault
					}`}
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
				})}
			>
				<div className={`${styles.creatorBodyDetails}`}>
					<div className={`${styles.creatorBodyProfileImage}`}>
						<Avatar username={uname} dimensions={128} />
					</div>
					<div className={`${styles.creatorBodyDetailsText}`}>
						<div className={`${styles.creatorBodyTitle}`}>
							<h2 className={`${styles.creatorBodyName}`}>
								{username ? uname : "Loading..."}
							</h2>
						</div>
						<div className={`${styles.creatorBodyBio}`}>
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
				<div className={`${styles.creatorBodySocials}`}>
					<Follow />
				</div>
			</div>
			<div
				css={css({
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
					flex: "0 0 33.333333%",
				})}
			>
				{response}
			</div>
		</div>
	);
};

export default ViewCreator;
