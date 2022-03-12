import next from "next";
import styles from "../styles/Header.module.css";
import {
  GlobalNavButtonIcon,
  SettingsIcon,
  VideoIcon,
} from "@fluentui/react-icons-mdl2";

const Header = () => {
    return (
        <div className={styles.navContainer}>
        <div className={styles.navBar}>
          <GlobalNavButtonIcon className={styles.navIcon} />
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
                <VideoIcon className={styles.navIcon} />
              </a>
            </div>
            <div className="settings--container hover cursor">
              <SettingsIcon className={styles.navIcon} />
            </div>
            <div className="avatar--container hover cursor">
              <a href="/auth/manage">
                <img
                  className="avatar"
                  src="https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png"
                  alt="Default profile picture"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header;