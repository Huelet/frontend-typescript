import next from "next";
import Link from "next/link";
import { Menu, Search, Settings, VideoCamera } from "@fdn-ui/icons-react";
import { useState } from "react";
import styles from "../styles/Header.module.css";

export interface HeaderProps {
  username?: string;
}

export const Header = ({ username }: HeaderProps) => {
  const [pfp, setPfp] = useState("");
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
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <div className={styles.navIcon}>
          <Menu fill={"white"} width={52} height={52} />
        </div>
        <div className="searchBox">
          <form action="" method="get">
            <input
              className={styles.searchBar}
              type="text"
              name="query"
              placeholder="Search"
            />
            <button className={`${styles.searchbutton} cursor`} type="submit">
              <div className={`${styles.searchbutton}`}>
                <Search fill={"white"} />
              </div>
            </button>
          </form>
        </div>
        <div className={styles.accountIconsContainer}>
          <div className="hover cursor">
            <a href="https://dash.huelet.net">
              <div className={styles.navIcon}>
                <VideoCamera fill={"white"} width={52} height={52} />
              </div>
            </a>
          </div>
          <div className="settings--container hover cursor">
            <Link href="/auth/settings">
              <div className={styles.navIcon}>
                <Settings fill={"white"} width={52} height={52} />
              </div>
            </Link>
          </div>
          <div className="avatar--container hover cursor">
            <Link href="/auth/settings">
              <img
                className="avatar--image"
                src={
                  pfp
                    ? pfp
                    : "https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png"
                }
                alt="Profile image"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
