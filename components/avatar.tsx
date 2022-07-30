import * as React from "react";
import Image from "next/image";
import styles from "../styles/components/Avatar.module.css";
import { useEffect, useState } from "react";
import { useSound } from "use-sound";

export interface AvatarProps {
	username: string | undefined;
	dimensions?: number;
	link?: boolean;
	children?: React.ReactNode;
}

export const Avatar = ({
	username,
	dimensions,
	link,
	children,
}: AvatarProps) => {
	const [playBgSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Background.wav",
		{ volume: 1 }
	);
	const [pfp, setPfp] = useState<string>("");
	useEffect(() => {
		const getUserData = async () => {
			if (username) {
				const resp = await fetch(
					`https://api.huelet.net/auth/pfp?username=${username}`
				);
				setPfp((await resp.json()).pfp);
			}
		};
		getUserData();
	}, [username]);
	return (
		<div className="avatar--container">
			{pfp ? (
				<Image
					src={pfp}
					className={styles.avatarImageBorder}
					alt={`${username}'s profile picture`}
					loader={() => pfp}
					placeholder="empty"
					width={dimensions}
					height={dimensions}
				/>
			) : (
				<Image
					src="https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png"
					className={styles.avatarImageBorder}
					alt={"default profile picture"}
					loader={() =>
						"https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png"
					}
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAM1BMVEVndYWzuL2Nl6Gbo6yqsLZxfYx/ipd1gpCgp69seYmSm6WlrLN6hpOvtLqEjpqXn6iIkp4fvOWIAAAAiklEQVR4XtXS2woDMQgE0BnNbe/7/19bqKxQMrTPPa8adIL4D7uT3E5oJ4MvECofK4SLqWJ2MBkmCxNdjk4DMya528akojc+Cr4m2yGt8VZVu10V9TZrwD7ss6UVkscdCd9Dtj5vVVYzZzi6yKS+bqGUZ0Cp5x1IDcEoGYJTcoRBaSAUSgWBGn+XX0A2A4V4OvWYAAAAAElFTkSuQmCC"
					width={dimensions}
					height={dimensions}
				/>
			)}
		</div>
	);
};
