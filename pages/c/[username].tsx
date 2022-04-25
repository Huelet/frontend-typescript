import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import type { NextPage } from "next";
import styles from "../../styles/Creator.module.css";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ViewCreator: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [hydrinClicked, setHydrinClicked] = useState(false);
  const [header, setHeader] = useState("");
  const [pfp, setPfp] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [location, setLocation] = useState("");
  const [hydrinDot, setHydrinDot] = useState("");
  const router = useRouter();
  const { username } = router.query;
  const uname = username?.toString().replace("@", "");
  const getData = async () => {
    const profileImageData = await fetch(
      `https://api.huelet.net/auth/pfp?username=${uname}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const profileImage = await profileImageData.json();
    setPfp(profileImage.pfp);
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
      <div className={`${styles.creatorBody}`}>
        <div className={`${styles.creatorBodyDetails}`}>
          <div className={`${styles.creatorBodyProfileImage}`}>
            <img
              src={
                pfp
                  ? pfp
                  : "https://cdn.huelet.net/assets/AvatarMenu_defaultAvatarSmall.png"
              }
              alt="Profile"
              className={`${styles.creatorBodyProfileImage}`}
              width={128}
              height={128}
            />
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
                <p>{location}</p>
              </div>
            </div>
          </div>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;
