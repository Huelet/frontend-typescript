/** @jsxImportSource @emotion/react */
import * as React from "react";
import type { NextPage } from "next";
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { Button, Card } from "@huelet/foundation-ui";
import { useCookies } from "react-cookie";
import { Header } from "../../components/header";
import Link from "next/link";

const InvitePage: NextPage = () => {
	const [cookie, setCookie] = useCookies(["_hltoken"]);
	const [username, setUsername] = React.useState("");
	const [inviteLink, setInviteLink] = React.useState("");
	const router = useRouter();

	React.useEffect(() => {
		const checkCookie = async () => {
			const token = cookie._hltoken;
			if (token) {
				const resp = await fetch("https://api.huelet.net/auth/token", {
					method: "GET",
					mode: "cors",
					cache: "no-cache",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				setUsername((await resp.json()).username);
			}
		};
		checkCookie();
	}, [cookie]);

	return (
		<div id="klausen">
			<Header username={username} />
			<Card full={true} title="Invite someone">
				<Button
					type="primary"
					onPress={() => {
						fetch(`https://api.huelet.net/auth/invite?username=${username}`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${cookie._hltoken}`,
							},
						})
							.then((resp) => resp.json())
							.then((data) => {
								if (data.success === true)
									setInviteLink(
										`https://huelet.net/invite/${data.data.inviteId}`
									);
							});
					}}
					text="Generate an invite"
				/>
				{inviteLink ? (
					<div>
						<h1
							css={{
								textAlign: "center",
								marginTop: "1rem",
								marginBottom: "1rem",
							}}
						>
							Success!
						</h1>
						<Button
							type="secondary"
							text="Copy invite link"
							onPress={() => {
								navigator.clipboard.writeText(inviteLink);
							}}
						/>
						<p
							css={{
								textAlign: "center",
							}}
						>
							Or:
						</p>
						<div
							css={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Link
								href={`https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(
									new URL(location.href).origin
								)}&related=TeamHuelet&text=Here's%20my%20invite%20to%20Huelet!%20Click%20on%20it%20and%20sign%20up%20now!&url=${encodeURIComponent(
									inviteLink
								)}&via=TeamHuelet`}
							>
								<div
									css={css({
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										backgroundColor: "#1D9BF0",
										borderRadius: "50%",
										padding: "2em",
										cursor: "pointer",
									})}
								>
									<svg
										width={52}
										height={52}
										fill={"white"}
										viewBox="0 0 248 204"
									>
										<g>
											<path d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04   C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66   c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64   c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76   c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26   c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z" />
										</g>
									</svg>
								</div>
							</Link>
						</div>
					</div>
				) : null}
			</Card>
		</div>
	);
};

export default InvitePage;
