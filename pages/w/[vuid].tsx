/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Header } from "../../components/header";
import { useCookies } from "react-cookie";
import "react-loading-skeleton/dist/skeleton.css";
import { WarningFilled, ChevronDown, Check, Share } from "@fdn-ui/icons-react";
import { Popover } from "@mantine/core";
import { useSound } from "use-sound";
import { Card, Pill } from "@huelet/foundation-ui";
import { Avatar } from "../../components/avatar";
import Loader from "../../components/loader";
import { Follow } from "../../components/Buttons/follow";
import { VideoCard } from "../../components/video-card";
import { jsx, css } from "@emotion/react";

const ViewVideo: NextPage = () => {
	const [loading, setLoading] = useState(true);
	const [commentSubmitted, setCommentSubmitted] = useState(false);
	const [safeComment, setSafeComment] = useState(false);
	const [cookie, setCookie] = useCookies(["_hltoken"]);
	const [videoData, setVideoData]: [any, any] = useState({});
	const [authorData, setAuthorData]: [any, any] = useState({});
	const [commentAuthorData, setCommentAuthorData]: [any, any] = useState([]);
	const [username, setUsername] = useState("");
	const [comment, changeComment] = useState("");

	const [userUpvoted, setUserUpvoted] = useState(false);
	const [userDownvoted, setUserDownvoted] = useState(false);
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
	useEffect(() => {
		const getCommentData = async () => {
			videoData?.comments?.forEach((element) => {
				fetch(`https://api.huelet.net/auth/user?uid=${element.author}`)
					.then((res) => res.json())
					.then((data) => {
						setCommentAuthorData((prevState: any) => [
							...prevState,
							{ uid: data?.data?.uid, username: data?.data?.username },
						]);
					});
			});
		};
		getCommentData();
	}, [videoData]);
	const submitComment = async () => {
		setCommentSubmitted(true);
		const safetyCheck = await fetch(
			"https://westus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?autocorrect=true&PII=true&classify=true&language=eng",
			{
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				redirect: "follow",
				referrerPolicy: "no-referrer",
				headers: {
					"Content-Type": "text/plain",
					"Ocp-Apim-Subscription-Key": "0bb07c0b41e149edaf8bde43f83bc3c5",
				},
				body: comment,
			}
		);
		const safetyCheckData = await safetyCheck.json();
		if (
			safetyCheckData.Classification.Category1.Score >= 0.9 ||
			safetyCheckData.Classification.Category2.Score >= 0.9 ||
			safetyCheckData.Classification.Category3.Score >= 0.98
		) {
			setSafeComment(true);
		} else {
			setSafeComment(false);
			await pushComment();
		}
		setCommentSubmitted(false);
	};
	const pushComment = async () => {
		const resp = await fetch(
			`https://api.huelet.net/videos/interact/comments/${vuid}`,
			{
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				redirect: "follow",
				referrerPolicy: "no-referrer",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookie._hltoken}`,
				},
				body: JSON.stringify({
					username: username,
					content: comment,
				}),
			}
		);
		const data = await resp.json();
		if (data.success === true) {
			window.location.reload();
		}
	};
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
				<MobileView>
					<Player
						id={[...Array(2)]
							.map((i) =>
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
						css={css({
							paddingTop: "56% !important",
							borderRadius: "15px",
						})}
					/>
					<h2>{videoData?.title}</h2>
					<div
						css={css({
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-evenly",
							border: "rgb(50, 49, 48) solid 0.1em",
							borderRadius: "0.5em",
							padding: "1em",
						})}
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
							>
								<ChevronDown fill="white" />
							</div>
						</div>
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
						<VideoCard vuid={undefined} />
						<div className="spacer-sm"></div>
						<VideoCard vuid={undefined} />
					</div>
				</MobileView>
				<BrowserView>
					<main
						css={css({
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							width: "100vw",
							height: "80vh",
						})}
					>
						<Card
							css={css({
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								padding: "1em",
								border: "0.25em solid var(--hueletColor) !important",
							})}
							padding={3}
						>
							<div
								css={css({
									padding: "1.3em 4.3em",
								})}
							>
								<h2
									css={css({
										padding: "0 0 0.7em 0.7em",
										fontSize: "2.3em",
									})}
								>
									Comments
								</h2>
								<div
									css={css({
										padding: "0 0 3em 3em",
									})}
								>
									{/* editor here */}
									<div
										css={css({
											width: "5em",
											float: "right",
										})}
									>
										<div
											className={"button-primary"}
											css={css({
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											})}
											onClick={() => {
												submitComment();
												playSubmitSound();
											}}
										>
											<div
												className={
													commentSubmitted
														? "video-details-comments-box-submit-button-text"
														: "hidden"
												}
											>
												<Loader />
											</div>
											<p
												className={
													commentSubmitted
														? "hidden"
														: "video-details-comments-box-submit-button-text"
												}
											>
												Post
											</p>
											<Popover
												opened={safeComment}
												onClose={() => setSafeComment(false)}
												width={260}
												position="bottom"
												withArrow
												target={undefined}
											>
												<div
													css={css({
														display: "flex",
														flexDirection: "row",
														padding: "1em",
														fontFamily: "'Red Hat Text', sans-serif",
													})}
												>
													<div
														css={css({
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															flexDirection: "column",
															width: "3.5em",
															height: "3em",
															padding: "0.5em",
															borderRadius: "50%",
															background: "#ff0077",
														})}
													>
														<WarningFilled fill="white" />
													</div>
													<div
														css={css({
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															flexDirection: "column",
															width: "100%",
															height: "100%",
															paddingLeft: "1em",
														})}
													>
														<h2
															css={css({
																fontSize: "2em",
															})}
														>
															Are you sure you want to post this comment?
														</h2>
														<p>
															Want to double-check this comment? We&apos;re
															asking people to review content that may be
															sensitive.
															<br />
															<p
																css={css({
																	paddingTop: "0.5em",
																	fontWeight: "900",
																})}
															>
																Please remember the human behind the screen.
															</p>
															<br />
															<span>
																If you&apos;re sure, click the button below.
																<div
																	className={"button-primary"}
																	css={css({
																		display: "flex",
																		justifyContent: "center",
																		alignItems: "center",
																		marginTop: "1em",
																	})}
																	onClick={pushComment}
																>
																	I&apos;m sure
																</div>
																<br />
																<Link href="https://docs.huelet.net/users/comment-verification">
																	Read more.
																</Link>
															</span>
														</p>
													</div>
												</div>
											</Popover>
										</div>
									</div>
								</div>
							</div>
							<div
								css={css({
									padding: "4em",
								})}
							>
								<div></div>
							</div>
						</Card>
						<div>
							<div
								css={css({
									padding: "2em",
								})}
							>
								<h1
									css={css({
										fontSize: "3em",
									})}
								>
									{videoData?.title}
								</h1>
								<div
									css={css({
										display: "flex",
										flexDirection: "column",
										borderRadius: "15px",
										padding: "2em",
										width: "800px",
										height: "430px",
									})}
								>
									<Player
										id={[...Array(2)]
											.map((i) =>
												Math.round(
													Date.now() + Math.random() * Date.now()
												).toString(36)
											)
											.join("")}
										sources={{
											hd: {
												play_url: videoData?.vurl_webm || videoData?.url,
											},
										}}
										cover={videoData?.thumbnail}
										title={videoData?.title}
										css={css({
											paddingTop: "56% !important",
											borderRadius: "15px !important",
										})}
									/>
								</div>
							</div>
							<div
								css={css({
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									padding: "2em",
									border: "1px solid #e6e6e6",
									borderRadius: "15px",
								})}
							>
								<Link href={`/c/@${authorData?.username}`} passHref={true}>
									<div
										css={css({
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
										})}
									>
										<Avatar username={authorData?.username} dimensions={128} />
										<div
											css={css({
												display: "flex",
												flexDirection: "column",
												paddingLeft: "1em",
											})}
										>
											{authorData?.approved ? (
												<>
													<span
														css={css({
															display: "flex",
															flexDirection: "row",
															justifyContent: "center",
															alignItems: "center",
														})}
													>
														<h2>@{authorData?.username}</h2>
														<Check
															fill="green"
															css={css({
																marginLeft: "0.5em",
															})}
														/>
													</span>
													<div
														dangerouslySetInnerHTML={{
															__html: authorData?.bio,
														}}
													></div>
												</>
											) : (
												<>
													<h2>@{authorData?.username}</h2>
													<div
														dangerouslySetInnerHTML={{
															__html: authorData?.bio,
														}}
													></div>
												</>
											)}
											<Follow />
										</div>
									</div>
								</Link>
								<div
									css={css({
										display: "flex",
										flexDirection: "row",
									})}
								>
									<div
										css={css({
											display: "flex",
											flexDirection: "column",
										})}
									>
										<Pill type="primary">
											{videoData?.views === 1
												? `${videoData?.views} view`
												: `${videoData?.views} views`}
										</Pill>
										<div className="spacer-sm"></div>
										<Pill type="primary">
											{videoData?.createdAt
												? new Date(videoData?.createdAt).toLocaleDateString()
												: "Unknown"}
										</Pill>
									</div>
								</div>
								<div
									css={css({
										display: "flex",
										flexDirection: "row",
									})}
								>
									<div
										css={css({
											marginLeft: "0.5em",
											fontSize: "1.5em",
										})}
									>
										<svg
											width="24"
											height="24"
											viewBox="0 0 270 270"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											css={css({
												cursor: "pointer",
											})}
											onClick={async () => {
												const resp = await fetch(
													`https://api.huelet.net/videos/interact/upvote/${vuid}`,
													{
														method: "POST",
													}
												);
												console.log(await resp.json());
												setVideoData((prev) => {
													return {
														...prev,
														upvotes: prev?.upvotes + 1,
													};
												});
												setUserUpvoted(true);
											}}
										>
											<path
												d="M118.125 40.0714H119.625V38.5714V19.2857C119.625 9.26853 126.69 1.5 135 1.5C143.31 1.5 150.375 9.26853 150.375 19.2857V38.5714V40.0714H151.875H202.5C229.449 40.0714 251.625 65.109 251.625 96.4286V135V136.5H253.125C261.435 136.5 268.5 144.269 268.5 154.286C268.5 164.303 261.435 172.071 253.125 172.071H251.625V173.571V212.143C251.625 243.462 229.449 268.5 202.5 268.5H67.5C40.5509 268.5 18.375 243.462 18.375 212.143V173.571V172.071H16.875C8.56549 172.071 1.5 164.303 1.5 154.286C1.5 144.269 8.56551 136.5 16.875 136.5H18.375V135V96.4286C18.375 65.109 40.5509 40.0714 67.5 40.0714H118.125ZM85.875 115.714C85.875 105.697 92.9405 97.9286 101.25 97.9286C109.56 97.9286 116.625 105.697 116.625 115.714C116.625 125.731 109.56 133.5 101.25 133.5C92.9405 133.5 85.875 125.731 85.875 115.714ZM153.375 115.714C153.375 105.697 160.441 97.9286 168.75 97.9286C177.059 97.9286 184.125 105.697 184.125 115.714C184.125 125.731 177.06 133.5 168.75 133.5C160.441 133.5 153.375 125.731 153.375 115.714ZM88.5048 163.629C93.2648 155.469 102.732 153.408 109.701 158.718C121.212 167.488 128.753 170.25 135 170.25C141.247 170.25 148.788 167.488 160.298 158.718C167.268 153.408 176.735 155.469 181.495 163.629C186.314 171.89 184.306 183.012 177.202 188.425C163.399 198.941 149.847 205.821 135 205.821C120.153 205.821 106.601 198.941 92.7985 188.425C85.6936 183.012 83.6859 171.89 88.5048 163.629ZM67.5 75.6429C57.1699 75.6429 49.125 85.1434 49.125 96.4286V212.143C49.125 223.428 57.1699 232.929 67.5 232.929H202.5C212.83 232.929 220.875 223.428 220.875 212.143V96.4286C220.875 85.1434 212.83 75.6429 202.5 75.6429H67.5Z"
												fill={userUpvoted ? "green" : "white"}
												stroke="black"
												strokeWidth="3"
											/>
										</svg>

										{videoData?.upvotes}
									</div>
									<div
										css={css({
											marginRight: "0.5em",
											fontSize: "1.5em",
										})}
									>
										<svg
											width="24"
											height="24"
											viewBox="0 0 270 270"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											css={css({
												cursor: "pointer",
											})}
											onClick={async () => {
												const resp = await fetch(
													`https://api.huelet.net/videos/interact/downvote/${vuid}`,
													{
														method: "POST",
													}
												);
												console.log(await resp.json());
												setVideoData((prev) => {
													return {
														...prev,
														downvotes: prev?.downvotes + 1,
													};
												});
												setUserDownvoted(true);
											}}
										>
											<path
												d="M118.125 40.0714H119.625V38.5714V19.2857C119.625 9.26853 126.69 1.5 135 1.5C143.31 1.5 150.375 9.26853 150.375 19.2857V38.5714V40.0714H151.875H202.5C229.449 40.0714 251.625 65.109 251.625 96.4286V135V136.5H253.125C261.434 136.5 268.5 144.269 268.5 154.286C268.5 164.303 261.434 172.071 253.125 172.071H251.625V173.571V212.143C251.625 243.462 229.449 268.5 202.5 268.5H67.5C40.5509 268.5 18.375 243.462 18.375 212.143V173.571V172.071H16.875C8.56549 172.071 1.5 164.303 1.5 154.286C1.5 144.269 8.56551 136.5 16.875 136.5H18.375V135V96.4286C18.375 65.109 40.5509 40.0714 67.5 40.0714H118.125ZM85.875 115.714C85.875 114.169 85.8357 112.603 85.7987 111.128C85.7726 110.091 85.7477 109.099 85.7384 108.192C85.715 105.897 85.7842 103.956 86.1069 102.378C86.4273 100.811 86.9663 99.7615 87.7583 99.0842C88.5418 98.4143 89.7842 97.9286 91.8894 97.9286C95.9897 97.9286 100.318 100.37 104.713 104.104C108.618 107.422 112.354 111.561 115.812 115.392C116.217 115.84 116.617 116.284 117.013 116.721C118.567 118.436 118.898 120.179 118.507 121.893C118.095 123.697 116.844 125.601 114.969 127.379C111.189 130.961 105.445 133.5 101.25 133.5C92.9405 133.5 85.875 125.731 85.875 115.714ZM152.885 116.823C154.639 115.226 156.49 113.334 158.376 111.404C158.553 111.224 158.729 111.044 158.906 110.863C160.991 108.733 163.129 106.57 165.313 104.626C169.758 100.669 174.062 97.9286 178.111 97.9286C180.216 97.9286 181.458 98.4143 182.242 99.0842C183.034 99.7615 183.573 100.811 183.893 102.378C184.216 103.956 184.285 105.897 184.262 108.192C184.252 109.099 184.227 110.091 184.201 111.128C184.164 112.603 184.125 114.169 184.125 115.714C184.125 125.731 177.06 133.5 168.75 133.5C166.724 133.5 164.265 132.814 161.783 131.601C159.316 130.396 156.93 128.72 155.057 126.859C153.163 124.979 151.903 123.02 151.491 121.271C151.105 119.631 151.439 118.14 152.885 116.823ZM181.495 205.962C176.735 214.122 167.268 216.183 160.299 210.873C159.37 210.166 158.497 209.496 157.671 208.861C153.495 205.654 150.511 203.362 147.595 201.86C143.97 199.994 140.465 199.341 135 199.341C129.535 199.341 126.03 199.994 122.405 201.86C119.489 203.362 116.505 205.654 112.329 208.861C111.503 209.496 110.63 210.166 109.701 210.873C106.242 213.509 101.199 214.367 96.3251 213.457C91.457 212.547 87.0351 209.925 84.723 205.962C82.4311 202.033 82.529 197.32 84.2184 192.759C85.9094 188.193 89.1412 183.953 92.7985 181.166C106.601 170.651 120.153 163.77 135 163.77C149.847 163.77 163.399 170.651 177.201 181.166C184.306 186.58 186.314 197.701 181.495 205.962ZM67.5 75.6429C57.1699 75.6429 49.125 85.1434 49.125 96.4286V212.143C49.125 223.428 57.1699 232.929 67.5 232.929H202.5C212.83 232.929 220.875 223.428 220.875 212.143V96.4286C220.875 85.1434 212.83 75.6429 202.5 75.6429H67.5Z"
												fill={userDownvoted ? "red" : "white"}
												stroke="black"
												strokeWidth="3"
											/>
										</svg>

										{videoData?.downvotes}
									</div>
									<div>
										<Share fill="white" width="24" height="24" />
									</div>
								</div>
							</div>
						</div>
					</main>
				</BrowserView>
			</article>
		</div>
	);
};

export default ViewVideo;
