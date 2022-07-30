import * as React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Header } from "../components/header";
import { useCookies } from "react-cookie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSound } from "use-sound";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { VideoCard } from "../components/video-card";

const Search: NextPage = () => {
	const [loading, setLoading] = useState(true);
	const [cookie, setCookie] = useCookies(["_hltoken"]);
	const [username, setUsername] = useState("");
	const [searchData, setSearchData]: any[] = useState([]);
	const [response, setResponse] = useState(<></>);
	const mounted: any = useRef(false);
	const { query } = useRouter();
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
	useEffect(() => {
		const getUserData = async () => {
			const resp = await fetch("https://api.huelet.net/auth/token", {
				headers: {
					Authorization: `Bearer ${cookie._hltoken}`,
				},
			});
			setUsername((await resp.json()).username);
		};
		getUserData();
	}, [cookie._hltoken]);
	useEffect(() => {
		const getSearchData = async () => {
			const resp = await fetch(`https://api.huelet.net/videos/search?searchContent=${query.q}`);
			setSearchData((await resp.json()).data);
			setLoading(false);
		};
	}, [query.q]);
	useEffect(() => {
		if (mounted.current) {
			setResponse(
				searchData.hits.map(({ vuid }) => {
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
	}, [searchData]);
	return (
		<div id="klausen">
			<SkeletonTheme baseColor="#4E4E4E" highlightColor="#686868">
				<Header username={username} />
				<div className="spacer-sm"></div>
				<article>{response}</article>
				<aside>
					<div className="adFrame--rightAsideColumn">hi!! i&apos;m an ad!</div>
				</aside>
			</SkeletonTheme>
		</div>
	);
};

export default Search;
