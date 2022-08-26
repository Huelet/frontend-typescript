/** @jsxImportSource @emotion/react */
import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "@fontsource/red-hat-display";
import "@fontsource/red-hat-text";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import {
	SpotlightProvider,
	registerSpotlightActions,
} from "@mantine/spotlight";
import { CookiesProvider } from "react-cookie";
import { Search, Settings, Star, Video } from "@fdn-ui/icons-react";
import Script from "next/script";

function HueletWebapp({ Component, pageProps }: AppProps) {
	const router = useRouter();
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
				<Script
					defer
					type="text/javascript"
					src="https://api.pirsch.io/pirsch.js"
					id="pirschjs"
					data-code="32siQ36yPulRQHCEKfrRVOs8ywQpqsgx"
					strategy="afterInteractive"
				/>
				<Script
					id="clarity-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
		  (function(c,l,a,r,i,t,y){
			  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
			  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
			  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
		  })(window, document, "clarity", "script", "6pivjnysm5");`,
					}}
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
						<Component {...pageProps} />
					</SpotlightProvider>
				</MantineProvider>
			</CookiesProvider>
		</>
	);
}

export default HueletWebapp;
