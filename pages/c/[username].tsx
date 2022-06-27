import { useRouter } from "next/router";
import type { NextPage } from "next";
import styles from "../../styles/Creator.module.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Location } from "@fdn-ui/icons-react";
import { Header } from "../../components/header";
import { Follow } from "../../components/Buttons/follow";
import { Avatar } from "../../components/avatar";

const ViewCreator: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState("");
  const [pfp, setPfp] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState([]);
  const [location, setLocation] = useState("");
  const router = useRouter();
  const { username } = router.query;
  const uname = username?.toString().replace("@", "");
  useEffect(() => {
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
    getData();
  }, []);
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
        className={`${styles.creatorBody}`}
        style={{
          // TODO: make this dynamic
          boxShadow: `0px -120px 120px 0px #1ed760 !important`,
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
                <p>{pronouns.join("/")}</p>
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
          <Follow />
        </div>
      </div>
      <div className={`${styles.creatorVideos}`}></div>
    </div>
  );
};

export default ViewCreator;
