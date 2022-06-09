import { useRouter } from "next/router";
import type { NextPage } from "next";
import styles from "../../styles/Creator.module.css";
import { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { useCookies } from "react-cookie";
import { Location } from "@fdn-ui/icons-react";
import { Header } from "../../components/header";
import { Follow } from "../../components/Buttons/follow";
import { Avatar } from "@mantine/core";

const ViewCreator: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [hydrinClicked, setHydrinClicked] = useState(false);
  const [header, setHeader] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [location, setLocation] = useState("");
  const [hydrinDot, setHydrinDot] = useState("");
  const [imageColor, setImageColor] = useState("");
  const router = useRouter();
  const { username } = router.query;
  const uname = username?.toString().replace("@", "");
  const getData = async () => {
    const bioData = await fetch(
      `https://api.huelet.net/auth/bio?username=${uname}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const bioDataJSON = await bioData.json();
    setBio(bioDataJSON.bio);
    const pronounData = await fetch(
      `https://api.huelet.net/auth/pronouns?username=${uname}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const pronounDataJSON = await pronounData.json();
    setPronouns(pronounDataJSON.pronouns);
    const locationData = await fetch(
      `https://api.huelet.net/auth/location?username=${uname}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const locationDataJSON = await locationData.json();
    setLocation(locationDataJSON.location);

    setLoading(false);
  };
  if (loading === true) {
    getData();
  } else {
    null;
  }
  return (
    <div id="klausen">
      <Header username="" />
      <div className={`${styles.creatorHeader}`}>
        <img
          src={header ? header : "https://cdn.huelet.net/assets/logo.png"}
          alt="Header"
          className={`${
            header
              ? styles.creatorHeaderImage
              : styles.creatorHeaderImageDefault
          }`}
        />
      </div>
      <div
        className={`${styles.creatorBody} ${loading ? "hidden" : ""}`}
        style={{
          boxShadow: `0px -120px 120px 0px ${
            imageColor ? imageColor : "#1ed760"
          } !important`,
        }}
      >
        <div className={`${styles.creatorBodyDetails}`}>
          <div className={`${styles.creatorBodyProfileImage}`}>
            <Avatar username={uname} chonky={true} />
          </div>
          <div className={`${styles.creatorBodyDetailsText}`}>
            <div className={`${styles.creatorBodyTitle}`}>
              <h2 className={`${styles.creatorBodyName}`}>
                {username ? uname : "Loading..."}
              </h2>
            </div>
            <div className={`${styles.creatorBodyBio}`}>
              <div className={`${styles.creatorBodyBioText}`}>
                <p>{bio}</p>
              </div>
              <div className={`${styles.creatorBodyBioPronouns}`}>
                <p>{pronouns}</p>
              </div>
              <div className={`${styles.creatorBodyBioLocation}`}>
                <Location fill={"white"} />
                <p>{location}</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div className={`${styles.creatorBodySocials}`}>
          <div className={`${styles.creatorBodySocialsItems}`}>
            {hydrinDot ? (
              <a href={`https://hydr.in/${hydrinDot}`}>
                <img
                  src="https://cdn.huelet.net/assets/hydrin_favicon.png"
                  alt="Hydrin"
                  width={64}
                  height={64}
                />
              </a>
            ) : (
              <div></div>
            )}
            <div className={styles.nullModeToggle} hidden={true}></div>
          </div>
          <Follow />
        </div>
      </div>
      <div className={`${styles.creatorVideos}`}></div>
    </div>
  );
};

export default ViewCreator;
