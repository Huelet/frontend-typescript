/** @jsxImportSource @emotion/react */
import * as React from "react";
import NextImage from "next/image";
import { jsx, css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useSound } from "use-sound";
import Skeleton from "react-loading-skeleton";

export interface AvatarProps {
	username: string | undefined;
	dimensions?: number;
	link?: boolean;
	dontUseNextImage?: boolean;
	children?: React.ReactNode;
}

export const Avatar = ({
	username,
	dimensions,
	link,
	dontUseNextImage,
	children,
}: AvatarProps) => {
	const [playBgSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Background.wav",
		{ volume: 1 }
	);
	const [loading, setLoading] = useState(true);
	const [pfp, setPfp] = useState<string>("");

	const ImageElement = dontUseNextImage ? "img" : NextImage;

	useEffect(() => {
		const getUserData = async () => {
			if (username) {
				const resp = await fetch(
					`https://api.huelet.net/auth/pfp?username=${username}`
				);

				setPfp((await resp.json()).pfp);

				setLoading(false);
			}
		};
		getUserData();
	}, [username]);
	return (
		<div className="avatar--container">
			{loading ? (
				<Skeleton height={dimensions} width={dimensions} circle={true} />
			) : (
				<ImageElement
					src={pfp ? pfp : "https://cdn.huelet.net/assets/images/avatar.png"}
					css={{
						border: "2px solid var(--hueletColor) !important",
						borderRadius: "50% !important",
						padding: "2px !important",
					}}
					alt={`${username}'s profile picture`}
					placeholder="empty"
					loader={({ src, width, quality }) =>
						`${src}?width=${width}&quality=${quality || 70}`
					}
					width={dimensions}
					height={dimensions}
				/>
			)}
		</div>
	);
};
