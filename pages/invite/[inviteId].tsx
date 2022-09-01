/** @jsxImportSource @emotion/react */
import * as React from "react";
import type { NextPage } from "next";
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button, Card } from "@huelet/foundation-ui";
import { Anchor, Checkbox, Stepper } from "@mantine/core";
import { DateTime } from "luxon";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Avatar } from "../../components/avatar";
import Link from "next/link";
import { useCookies } from "react-cookie";

const Invite: NextPage = () => {
	const [step, setStep] = useState(0);
	const [inviteInformation, setInviteInformation]: [
		any,
		React.Dispatch<React.SetStateAction<object>>
	] = useState({});
	const [userInformation, setUserInformation]: [
		any,
		React.Dispatch<React.SetStateAction<object>>
	] = useState({});
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [creator, toggleCreator] = useState(false);
	const [error, setError] = useState("");
	const [cookie, setCookie] = useCookies(["_hltoken"]);
	const router = useRouter();

	useEffect(() => {
		const getInviteData = async () => {
			setInviteInformation(
				(
					await (
						await fetch(
							`https://api.huelet.net/auth/invite/?inviteId=${
								router.query.inviteId as string
							}`
						)
					).json()
				).data.inviteInformation
			);
		};
		if (typeof router.query.inviteId !== "undefined") {
			getInviteData();
		}
	}, [router.query.inviteId]);

	useEffect(() => {
		const getUserData = async () => {
			setUserInformation(
				(
					await (
						await fetch(
							`https://api.huelet.net/auth/user?uid=${inviteInformation.userId}`
						)
					).json()
				).data
			);
		};
		if (typeof inviteInformation.userId !== "undefined") {
			getUserData();
		}
	}, [inviteInformation]);

	return (
		<SkeletonTheme baseColor="#4E4E4E" highlightColor="#686868">
			<div id="klausen">
				<Card title="Sign Up" full={true}>
					<div
						css={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							padding: "1rem",
						}}
					>
						<Stepper active={step} onStepClick={setStep}>
							<Stepper.Step title="Invite">
								<div
									css={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<h1
										css={{
											fontSize: "3rem",
										}}
									>
										Invite
									</h1>
									<div
										css={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: "rgba(26, 27, 30, 0.5)",
											borderRadius: "0.5rem",
											padding: "1rem",
										}}
									>
										<h1
											css={{
												fontSize: "2.5rem",
											}}
										>
											{router.query.inviteId}
										</h1>
										<p>
											{inviteInformation.expires ? (
												`Expires ${DateTime.fromMillis(
													inviteInformation.expires
												).toRelative()}`
											) : (
												<Skeleton width="15" height="1" />
											)}
										</p>
										<div>
											{userInformation ? (
												<div
													css={{
														display: "flex",
														flexDirection: "row",
													}}
												>
													Invited by:
													<Avatar
														username={userInformation.username}
														dimensions={24}
													/>{" "}
													{userInformation.username}
												</div>
											) : (
												<Skeleton width="15" height="1" />
											)}
										</div>
									</div>
									<Button type="primary" onPress={() => setStep(1)}>
										Next
									</Button>
								</div>
							</Stepper.Step>
							<Stepper.Step title="Your Information">
								<div
									css={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<div
										css={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											padding: "0.4em",
											backgroundColor: "#303245",
											borderRadius: "12px",
										}}
									>
										<input
											name="username"
											placeholder="Username"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											css={{
												color: "white",
												border: "none",
												opacity: "1",
												cursor: "text",
												backgroundColor: "transparent",
												borderRadius: "12px",
												padding: "0.2em",
												width: "100%",
											}}
										/>
									</div>
									<div className="spacer-sm" />
									<div
										css={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											padding: "0.4em",
											backgroundColor: "#303245",
											borderRadius: "12px",
										}}
									>
										<input
											name="password"
											placeholder="Password"
											type="password"
											value={password}
											onChange={(e) => {
												setPassword(e.target.value);
											}}
											css={{
												color: "white",
												border: "none",
												opacity: "1",
												cursor: "text",
												backgroundColor: "transparent",
												borderRadius: "12px",
												padding: "0.2em",
												width: "100%",
											}}
										/>
										<span
											css={{
												color: "rgba(0, 150, 255, 1)",
												fontSize: "0.8em",
												marginTop: "0.2em",
												cursor: "pointer",
											}}
											onClick={() => {
												const length = 8,
													charset =
														"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=";
												let retVal = "";
												for (let i = 0, n = charset.length; i < length; ++i) {
													retVal += charset.charAt(
														Math.floor(Math.random() * n)
													);
												}
												setPassword(retVal);
											}}
										>
											Generate a password for me
										</span>
									</div>
									<Checkbox
										checked={creator}
										onChange={() => toggleCreator(!creator)}
										label={
											<span>
												I{" "}
												{creator ? (
													<strong>do</strong>
												) : (
													<strong>do not</strong>
												)}{" "}
												plan to publish content
											</span>
										}
									/>

									{creator ? (
										<>
											<div className="spacer-sm" />
											<div
												css={{
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "center",
													padding: "0.4em",
													backgroundColor: "#303245",
													borderRadius: "12px",
												}}
											>
												<input
													name="email"
													placeholder="Email"
													type="email"
													value={email}
													onChange={(e) => {
														setEmail(e.target.value);
													}}
													css={{
														color: "white",
														border: "none",
														opacity: "1",
														cursor: "text",
														backgroundColor: "transparent",
														borderRadius: "12px",
														padding: "0.2em",
														width: "100%",
													}}
												/>
											</div>
										</>
									) : null}

									<p
										dangerouslySetInnerHTML={{
											__html: error,
										}}
										css={{
											color: "red",
											textAlign: "center",
											margin: "0.5em",
										}}
									/>

									<Button
										type="primary"
										onPress={async () => {
											const resp = await fetch(
												`https://api.huelet.net/v2/auth/up?inviteId=${router.query.inviteId}`,
												{
													method: "POST",
													headers: {
														"Content-Type": "application/json",
													},
													body: JSON.stringify({
														username: username,
														password: password,
														creator: creator,
														email: creator ? email : null,
													}),
												}
											);
											const data = await resp.json();

											if (resp.status === 404)
												setError("Please double-check your invite code!");
											if (data.errorCode === "0x10621")
												setError("This invite code has expired!");
											if (data.errorCode === "0x10622")
												setError(
													"This invite code has already been used past its limit!"
												);
											if (data.errorCode === "0x00611")
												setError("This username has already been taken!");
											if (data.errorCode === "0x10614")
												setError(
													"This password does not meet the requirements!"
												);
											if (data.errorCode === "0x00607")
												setError(
													"This username has invalid or profane content!"
												);
											if (data.errorCode === "0x11700")
												setError(
													"An unknown error occurred. Please report this bug!"
												);
											if (resp.status === 200) {
												setStep(2);
												setCookie("_hltoken", data.data.token, {
													path: "/",
													maxAge: 60 * 60 * 24 * 30,
												});

												localStorage.setItem("username", username);
												localStorage.setItem("token", data.data.token);
											}
										}}
									>
										Next
									</Button>
								</div>
							</Stepper.Step>
							<Stepper.Step title="Customize">
								<div
									css={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Button
										link="/auth/settings/"
										onPress={() => {
											null;
										}}
										type="primary"
									>
										I&apos;d like to customize my account
									</Button>
									<Button
										link="/explore/"
										onPress={() => {
											null;
										}}
										type="secondary"
									>
										Take me home
									</Button>
								</div>
							</Stepper.Step>
						</Stepper>
					</div>
				</Card>
			</div>
		</SkeletonTheme>
	);
};

export default Invite;
