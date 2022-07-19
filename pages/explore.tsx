import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/ExplorePage.module.css";
import { useCookies } from "react-cookie";
import { Header } from "../components/header";
import { VideoCard } from "../components/video-card";

const Explore: NextPage = () => {
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");
  const [todayVideos, setTodayVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("");
  const getUsername = () => {
    fetch("https://api.huelet.net/auth/token", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie._hltoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      });
  };
  getUsername();
  const getDate = () => {
    let d = new Date(Date.now());
    return d.getHours() <= 12 ? "Morning" : "Afternoon";
  };
  useEffect(() => {
    const getLocation = async () => {
      const locationData = await fetch("https://ipapi.co/json");
      const weatherData = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=1e9c6dd478af4f6fa8205430222106&q=${(await locationData.json()).city},%20${(await locationData.json()).region}&aqi=no`
      );
      console.log((await weatherData.json()).current.condition.text);
      setLocation(`${(await locationData.json()).city}, ${(await locationData.json()).region}`);
      setWeather((await weatherData.json()).current.condition.text);
    };
    getLocation();
  });
  return (
    <div id="klausen">
      <Head>
        <title>Explore - Huelet - The video platform for humans</title>
      </Head>
      <Header username={username} />
      <div className={styles.exploreContainer}>
        <div
          className={`${styles.exploreWelcome}`}
        >
          <img
            src="https://cdn.huelet.net/assets/logo.png"
            alt="Huelet logo"
            width={64}
            height={64}
            className={`${isOpen ? "hidden" : ""}`}
          />
          <div className={styles.exploreWelcomeText}>
            <h2>Good {getDate()}!</h2>
            <h2>
              It&apos;s {weather} in {location}
            </h2>
          </div>
        </div>
        <div className={styles.mainText}>
          <h2 className={styles.mainText}>
            We&apos;re working on this part. Come back later.
          </h2>
        </div>
        <div className={styles.exploreVideoList}>
          <h2 className={styles.exploreVideoListText}>Today&apos;s videos</h2>
          <div className={styles.exploreVideoListItems}>
            <VideoCard vuid={"x181c2etzrzqvd4o"} />
            <VideoCard vuid={"15xqiownj1672fjysg"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
