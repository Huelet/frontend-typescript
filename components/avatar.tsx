import next from "next";
import Image from "next/image";
import styles from "../styles/components/Avatar.module.css";
import {
  Accessibility,
  Copy,
  Help,
  Notepad,
  PaintBrush,
  Search,
  Settings,
  Subtitles,
  VideoCamera,
} from "@fdn-ui/icons-react";
import { useEffect, useState } from "react";
import { useSound } from "use-sound";

export interface AvatarProps {
  username: string | undefined;
  chonky?: boolean;
  link?: boolean;
  children?: React.ReactNode;
}

export const Avatar = ({ username, chonky, link, children }: AvatarProps) => {
  const [playBgSound] = useSound(
    "https://cdn.huelet.net/assets/sounds/Windows%20Background.wav",
    { volume: 1 }
  );
  const [pfp, setPfp] = useState<string>("");
  useEffect(() => {
    const getUserData = () => {
      if (username) {
        fetch(`https://api.huelet.net/auth/pfp?username=${username}`)
          .then((res) => res.json())
          .then((data) => {
            setPfp(data.pfp);
          });
      }
    };
    getUserData();
  }, [username]);
  return (
    <div className="avatar--container">
      {pfp ? (
        <Image
          src={pfp}
          className={`${
            chonky ? styles.avatarImageChonky : styles.avatarImage
          } ${styles.avatarImageBorder}`}
          alt={`${username}'s profile picture`}
          loader={() => pfp}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAM1BMVEVndYWzuL2Nl6Gbo6yqsLZxfYx/ipd1gpCgp69seYmSm6WlrLN6hpOvtLqEjpqXn6iIkp4fvOWIAAAAiklEQVR4XtXS2woDMQgE0BnNbe/7/19bqKxQMrTPPa8adIL4D7uT3E5oJ4MvECofK4SLqWJ2MBkmCxNdjk4DMya528akojc+Cr4m2yGt8VZVu10V9TZrwD7ss6UVkscdCd9Dtj5vVVYzZzi6yKS+bqGUZ0Cp5x1IDcEoGYJTcoRBaSAUSgWBGn+XX0A2A4V4OvWYAAAAAElFTkSuQmCC"
          width={chonky ? "128" : "64"}
          height={chonky ? "128" : "64"}
        />
      ) : (
        <Image
          src="https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png"
          className={`${
            chonky ? styles.avatarImageChonky : styles.avatarImage
          } ${styles.avatarImageBorder}`}
          alt={`default profile picture`}
          loader={() =>
            "https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png"
          }
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAM1BMVEVndYWzuL2Nl6Gbo6yqsLZxfYx/ipd1gpCgp69seYmSm6WlrLN6hpOvtLqEjpqXn6iIkp4fvOWIAAAAiklEQVR4XtXS2woDMQgE0BnNbe/7/19bqKxQMrTPPa8adIL4D7uT3E5oJ4MvECofK4SLqWJ2MBkmCxNdjk4DMya528akojc+Cr4m2yGt8VZVu10V9TZrwD7ss6UVkscdCd9Dtj5vVVYzZzi6yKS+bqGUZ0Cp5x1IDcEoGYJTcoRBaSAUSgWBGn+XX0A2A4V4OvWYAAAAAElFTkSuQmCC"
          width={chonky ? "128" : "64"}
          height={chonky ? "128" : "64"}
        />
      )}
    </div>
  );
};
