/** @jsxImportSource @emotion/react */
import * as React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { css, jsx } from "@emotion/react";
import { Button, Card } from "@huelet/foundation-ui";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { Header } from "../../components/header";
import { Download } from "@fdn-ui/icons-react";

const LogoList: NextPage = () => {
	const [cookie, setCookie] = useCookies(["_hltoken"]);
	const [username, setUsername] = React.useState("");
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
				const data = await resp.json();
				setUsername(data.username);
			}
		};
		checkCookie();
	}, [cookie]);
	return (
		<div id="klausen">
			<Header username={username} />
			<Card
				full={true}
				title="Logos"
				css={css({
					display: "grid",
				})}
			>
				<Card padding={20}>
					<Image
						src="https://cdn.huelet.net/assets/logo.png"
						alt="Huelet Logo"
						width={200}
						height={200}
						loader={() => "https://cdn.huelet.net/assets/logo.png"}
					/>
					<Button type="primary">
						<span
							css={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
								height: "100%",
							}}
							onClick={async () => {
								fetch("https://cdn.huelet.net/assets/logo.png")
									.then((response) => {
										return response.blob();
									})
									.then((blob) => {
										const a = document.createElement("a");
										a.href = URL.createObjectURL(blob);
										a.download = "";
										document.body.appendChild(a);
										a.click();
										document.body.removeChild(a);
									});
							}}
						>
							<Download fill="white" /> Download PNG
						</span>
					</Button>
				</Card>
			</Card>
		</div>
	);
};

export default LogoList;
