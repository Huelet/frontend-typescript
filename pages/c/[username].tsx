/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router";
import type { NextPage } from "next";
import styles from "../../styles/Creator.module.css";
import { useEffect, useState } from "react";
import { Location } from "@fdn-ui/icons-react";
import { Header } from "../../components/header";
import { Follow } from "../../components/Buttons/follow";
import { Avatar } from "../../components/avatar";
import { ColorExtractor } from "react-color-extractor";
import { jsx, css } from "@emotion/react";

const ViewCreator: NextPage = () => {
  const [user, setUser] = useState<any>({});
  const [colors, setColors] = useState<any[]>([]);
  const router = useRouter();
  const { username } = router.query;
  const uname = username?.toString().replace("@", "");
  useEffect(() => {
    const getData = async () => {
      const userData = await fetch(
        `https://api.huelet.net/auth/user?username=${uname}`
      );
      const userDataJSON = await userData.json();
      setUser(userDataJSON.data);
    };
    getData();
  }, [uname]);
  return (
    <div id="klausen">
      <Header username="" />
      <ColorExtractor
        src={user?.avatar}
        getColors={(colors) => {
          setColors(colors);
        }}
      />
      <div className={`${styles.creatorHeader}`}>
        <img
          src={
            user?.header
              ? user?.header
              : "https://cdn.huelet.net/assets/logo.png"
          }
          alt="Header"
          className={`${
            user?.header
              ? styles.creatorHeaderImage
              : styles.creatorHeaderImageDefault
          }`}
        />
      </div>
      <div
        css={css({
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#FFFFFF",
          background: "rgba(255, 255, 255, 0.20)",
          border: "0.1em solid rgba(0, 0, 0, 0.15)",
          borderRadius: "10px",
          transition: "0.6s",
          padding: "2em",
          boxShadow: `0px -120px 120px 0px ${
            colors
              ? colors[Math.floor(Math.random() * colors.length)]
              : "var(--hueletSecondaryColor)"
          } !important`,
        })}
      >
        <div className={`${styles.creatorBodyDetails}`}>
          <div className={`${styles.creatorBodyProfileImage}`}>
            <Avatar username={uname} dimensions={128} />
          </div>
          <div className={`${styles.creatorBodyDetailsText}`}>
            <div className={`${styles.creatorBodyTitle}`}>
              <h2 className={`${styles.creatorBodyName}`}>
                {username ? uname : "Loading..."}
              </h2>
            </div>
            <div className={`${styles.creatorBodyBio}`}>
              <div className={`${styles.creatorBodyBioText}`}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: user?.bio ? user?.bio : "Loading...",
                  }}
                ></p>
              </div>
              <div className={`${styles.creatorBodyBioPronouns}`}>
                <p>{user?.pronouns?.join("/")}</p>
              </div>
              <div className={`${styles.creatorBodyBioLocation}`}>
                <Location fill={"white"} />
                <p>{user?.location}</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div className={`${styles.creatorBodySocials}`}>
          <Follow />
        </div>
      </div>
      <div className={`${styles.creatorVideos}`}></div>
    </div>
  );
};

export default ViewCreator;
