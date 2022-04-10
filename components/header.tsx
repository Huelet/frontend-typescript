import next from "next";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Header.module.css";

export interface HeaderProps {
  username?: string;
}

export const Header = ({ username }: HeaderProps) => {
  const [pfp, setPfp] = useState("");
  const getUserData = () => {
    fetch(`https://api.huelet.net/auth/pfp?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        setPfp(data.pfp);
      });
  };
  getUserData();
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <img
          src="https://cdn.huelet.net/assets/icons/menu.svg"
          alt="menu icon"
          className={styles.navIcon}
        />
        <div>
          <form action="" method="get">
            <input
              className={styles.searchBar}
              type="text"
              name="query"
              placeholder="Search"
            />
            <button className={`${styles.searchbutton} cursor`} type="submit">
              <img
                src="https://cdn.huelet.net/assets/icons/search.svg"
                className={styles.searchbutton}
              />
            </button>
          </form>
        </div>
        <div className={styles.accountIconsContainer}>
          <div className="hover cursor">
            <a href="https://dash.huelet.net">
              <img
                src="https://cdn.huelet.net/assets/icons/video-camera.svg"
                alt="video camera icon"
                className={styles.navIcon}
              />
            </a>
          </div>
          <div className="settings--container hover cursor">
            <Link href="/auth/settings">
              <img
                src="https://cdn.huelet.net/assets/icons/settings.svg"
                alt="settings icon"
                className={styles.navIcon}
              />
            </Link>
          </div>
          <div className="avatar--container hover cursor">
            <Link href="/auth/settings">
              <img
                className="avatar--image"
                src={pfp ? pfp : "https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png"}
                alt="Profile image"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
