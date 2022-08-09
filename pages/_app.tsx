import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "../styles/adstyles.css";
import "../styles/VideoPlayer.css";
import "@fontsource/red-hat-display";
import "@fontsource/red-hat-text";
import type { AppProps } from "next/app";
import { Kbd, MantineProvider, Modal } from "@mantine/core";
import {
	SpotlightProvider,
	registerSpotlightActions,
} from "@mantine/spotlight";
import { CookiesProvider, useCookies } from "react-cookie";
import { Search, Settings, Star, Video } from "@fdn-ui/icons-react";

function HueletWebapp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [cookies, setCookie] = useCookies(["_hlnfmd"]);
	if (cookies._hlnfmd === undefined) {
		setCookie("_hlnfmd", 1, { path: "/" });
	}
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta name="theme-color" content="#181718" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Huelet" />
				<meta
					property="og:description"
					content="Huelet is the video platform for humans."
				/>
				<meta
					property="og:image"
					content="https://cdn.huelet.net/assets/Poster.png"
				/>
				<meta property="og:url" content="https://huelet.net" />
				<meta property="og:site_name" content="Huelet" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Huelet" />
				<meta
					name="twitter:description"
					content="Huelet is the video platform for humans."
				/>
				<meta
					name="twitter:image"
					content="https://cdn.huelet.net/assets/Poster.png"
				/>
				<meta name="twitter:url" content="https://huelet.net" />
				<meta name="twitter:site" content="@TeamHuelet" />
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="apple-touch-icon"
					href="https://cdn.huelet.net/assets/logo.png"
				/>
				<link
					rel="shortcut icon"
					href="https://cdn.huelet.net/assets/logo.png"
				/>
				<link
					rel="icon"
					type="image/png"
					href="https://cdn.huelet.net/assets/logo.png"
				/>
				<link
					rel="icon"
					type="image/png"
					href="https://cdn.huelet.net/assets/logo.png"
				/>
			</Head>
			<CookiesProvider>
				<MantineProvider
					theme={{ fontFamily: "Red Hat Display", colorScheme: "dark" }}
				>
					<SpotlightProvider
						actions={[
							{
								id: "search",
								title: "Search",
								onTrigger: () => {
									router.push("/s/");
								},
								icon: <Search fill="white" />,
							},
							{
								id: "settings",
								title: "Settings",
								onTrigger: () => {
									router.push("/auth/settings/");
								},
								icon: <Settings fill="white" />,
							},
							{
								id: "dash",
								title: "Video Dashboard",
								onTrigger: () => {
									router.push("https://dash.huelet.net");
								},
								icon: <Video fill="white" />,
							},
							{
								id: "liked",
								title: "Liked Videos",
								onTrigger: () => {
									router.push("/auth/liked/");
								},
								icon: <Star fill="white" />,
							},
						]}
						onQueryChange={async (query) => {
							const resp = await fetch(
								`https://api.huelet.net/videos/search?searchContent=${query}`
							);
							const data = (await resp.json()).data.hits;
							registerSpotlightActions([
								...data.map((video) => ({
									id: video.vuid,
									title: video.title,
									onTrigger: () => {
										router.push(`/w/${video.vuid}`);
									},
								})),
							]);
						}}
						shortcut={["mod + shift + P"]}
					>
						<Modal
							opened={cookies._hlnfmd === 1}
							onClose={() => setCookie("_hlnfmd", 0, { path: "/" })}
							title={<h2>New feature!</h2>}
						>
              You can now use the spotlight to navigate the site! Press{" "}
							<Kbd>mod</Kbd> + <Kbd>shift</Kbd> + <Kbd>P</Kbd> to open it.
						</Modal>
						<Component {...pageProps} />
					</SpotlightProvider>
				</MantineProvider>
			</CookiesProvider>
		</>
	);
}

export default HueletWebapp;
