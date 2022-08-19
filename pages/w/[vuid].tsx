/** @jsxImportSource @emotion/react */
import * as React from "react";
import { jsx, css, keyframes } from "@emotion/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { useCookies } from "react-cookie";
import "react-loading-skeleton/dist/skeleton.css";
import { ChevronDown } from "@fdn-ui/icons-react";
import { useSound } from "use-sound";
import { Pill } from "@huelet/foundation-ui";
import { Avatar } from "../../components/avatar";
import Loader from "../../components/loader";
import { Follow } from "../../components/Buttons/follow";
import { VideoCard } from "../../components/video-card";

const ViewVideo: NextPage = () => {
	const [loading, setLoading] = useState(true);
	const [cookie, setCookie] = useCookies(["_hltoken"]);
	const [videoData, setVideoData]: [any, any] = useState({});
	const [authorData, setAuthorData]: [any, any] = useState({});
	const [username, setUsername] = useState("");

	const [descriptionMenu, toggleDescriptionMenu] = useState(false);

	/* sounds */
	const [playBgSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Background.wav",
		{ volume: 1 }
	);
	const [playClickSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Hardware%20Fail.wav",
		{ volume: 1 }
	);
	const [playSubmitSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Hardware%20Insert.wav",
		{ volume: 1 }
	);
	const router = useRouter();
	const { vuid } = router.query;

	const Player = dynamic(() => import("griffith"), {
		loading: () => <Loader />,
	});
	useEffect(() => {
		const getUserData = async () => {
			const userData = await fetch("https://api.huelet.net/auth/token", {
				headers: {
					Authorization: `Bearer ${cookie._hltoken}`,
				},
			});
			setUsername((await userData.json()).username);
		};
		getUserData();
	}, [cookie._hltoken]);
	useEffect(() => {
		const getPageData = async () => {
			const videoResp = await fetch(
				`https://api.huelet.net/videos/lookup/${vuid}`
			);
			const videoRespData = await videoResp.json();
			setVideoData(videoRespData.data);
		};
		getPageData();
	}, [vuid]);
	useEffect(() => {
		const getAuthorData = async () => {
			const authorResp = await fetch(
				`https://api.huelet.net/auth/user?uid=${videoData?.authorId}`
			);
			const authorRespData = await authorResp.json();
			setAuthorData(authorRespData.data);

			setLoading(false);
		};
		getAuthorData();
	}, [videoData]);

	return (
		<div id="klausen">
			<Head>
				<title>
					{videoData?.title} by {authorData?.username} - Huelet, the video
					platform for humans
				</title>
				<meta
					name="title"
					content={`${videoData?.title} by ${authorData?.username} - Huelet, the video platform for humans`}
				/>
				<meta
					name="description"
					content={`${videoData?.title} is a video posted on Huelet, the video platform for humans. Start watching now!"`}
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://huelet.net/w/${vuid}`} />
				<meta
					property="og:title"
					content={`${videoData?.title} by ${authorData?.username} - Huelet, the video platform for humans`}
				/>
				<meta
					property="og:description"
					content={`${videoData?.title} is a video posted on Huelet, the video platform for humans. Start watching now!`}
				/>
				<meta property="og:image" content={videoData?.thumbnail} />
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={`https://huelet.net/w/${vuid}`} />
				<meta
					property="twitter:title"
					content={`${videoData?.title} by ${authorData?.username} - Huelet, the video platform for humans`}
				/>
				<meta
					property="twitter:description"
					content={`${videoData?.title} is a video posted on Huelet, the video platform for humans. Start watching now!`}
				/>
				<meta property="twitter:image" content={videoData?.img} />
			</Head>
			<Header username={username} />
			<div className="spacer-sm"></div>
			<article>
				<Player
					id={[...Array(2)]
						.map(() =>
							Math.round(Date.now() + Math.random() * Date.now()).toString(36)
						)
						.join("")}
					sources={{
						hd: {
							play_url: videoData?.vurl_webm || videoData?.url,
						},
					}}
					cover={videoData?.thumbnail}
					title={videoData?.title}
				/>
				<h2>{videoData?.title}</h2>
				<div
					css={css({
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
						border: "rgb(50, 49, 48) solid 0.1em",
						borderRadius: "0.5em",
						padding: "1em",
					})}
				>
					<div
						css={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-evenly",
						}}
					>
						<div
							css={css({
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							})}
						>
							<Avatar username={authorData?.username} dimensions={64} />
						</div>
						<div
							css={css({
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								padding: "0.5em",
							})}
						>
							<span
								css={css({
									display: "flex",
									flexDirection: "column",
								})}
							>
								<Link href={`/c/@${authorData?.username}`} passHref={true}>
									<h3>{authorData?.username}</h3>
								</Link>
								<p>{authorData?.followers} followers</p>
								<Follow />
							</span>
						</div>
						<div
							css={css({
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								padding: "0.5em",
							})}
						>
							<Pill type="primary">{videoData?.vviews} views</Pill>
							<div className="spacer-sm"></div>
							<Pill type="primary">{videoData?.vuploaded}</Pill>
						</div>
						<div
							css={css({
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								boxSizing: "border-box",
								cursor: "pointer",
							})}
						>
							<div
								css={css({
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									padding: "0.5em",
									border: "#eee solid 0.1em",
									borderRadius: "50%",
								})}
								onClick={() => toggleDescriptionMenu(!descriptionMenu)}
							>
								<ChevronDown
									fill="white"
									css={{
										transform: descriptionMenu
											? "rotate(180deg)"
											: "rotate(0deg)",

										animation: descriptionMenu
											? `${keyframes({
													from: {
														transform: "rotate(0deg)",
													},
													to: {
														transform: "rotate(180deg)",
													},
											  })} 0.5s ease-in-out`
											: `${keyframes({
													from: {
														transform: "rotate(180deg)",
													},
													to: {
														transform: "rotate(0deg)",
													},
											  })} 0.5s ease-in-out`,
									}}
								/>
							</div>
						</div>
					</div>
					<div
						css={{
							display: descriptionMenu ? "flex" : "none",
							flexDirection: descriptionMenu ? "column" : undefined,
							justifyContent: descriptionMenu ? "center" : undefined,
							alignItems: descriptionMenu ? "center" : undefined,
							padding: "0.5em",
						}}
						dangerouslySetInnerHTML={{
							__html: videoData?.description.replace(/\n/g, "<br />"),
						}}
					></div>
				</div>
				<div
					css={css({
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "0.5em",
						width: "98vw",

						"@media (min-width: 768px)": {
							flexDirection: "row",
						},
					})}
				>
					<VideoCard vuid={undefined} />
					<div className="spacer-sm"></div>
					<VideoCard vuid={undefined} />
				</div>
			</article>
		</div>
	);
};

export default ViewVideo;
