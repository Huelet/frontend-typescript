import next from "next";
import Link from "next/link";
import { Search, Settings, VideoCamera } from "@fdn-ui/icons-react";
import { useState } from "react";
import styles from "../styles/components/Header.module.css";
import { Modal } from "@mantine/core";

export interface HeaderProps {
  username?: string;
}

export const Header = ({ username }: HeaderProps) => {
  const [pfp, setPfp] = useState("");
  const [searchModal, toggleSearchModal] = useState(false);
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
          <Link href="/explore">
            <img
              src="https://cdn.huelet.net/assets/logo.png"
              alt="logo"
              width={64}
              height={64}
              style={{ borderRadius: "50%", cursor: "pointer" }}
            />
          </Link>
        </div>
        <div className="searchBox">
          <form action="/s" method="get">
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
          <button className={`${styles.searchbuttonMobile} cursor`}>
            <div
              className={`${styles.searchbuttonMobile}`}
              onClick={() => toggleSearchModal(true)}
            >
              <Search fill={"white"} />
            </div>
          </button>
          <Modal
            opened={searchModal}
            onClose={() => toggleSearchModal(false)}
            title="Search"
          >
            <div className={styles.searchModal}>
              <form action="/s" method="get">
                <input
                  className={styles.searchBarMobile}
                  type="text"
                  name="query"
                  placeholder="Search"
                />
                <button
                  className={`${styles.searchbuttonMobile} cursor`}
                  type="submit"
                >
                  <div className={`${styles.searchbuttonMobile}`}>
                    <Search fill={"white"} />
                  </div>
                </button>
              </form>
            </div>
          </Modal>
        </div>
        <div className={styles.accountIconsContainer}>
          <div className="hover cursor">
            <a href="https://dash.huelet.net">
              <div className={styles.navIcon}>
                <VideoCamera fill={"white"} width={64} height={64} />
              </div>
            </a>
          </div>
          <div className="settings--container hover cursor">
            <Link href="/auth/settings">
              <div className={styles.navIcon}>
                <Settings fill={"white"} width={64} height={64} />
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
