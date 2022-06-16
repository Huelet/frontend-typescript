import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import { useCookies } from "react-cookie";
import Link from "next/link";

const Home: NextPage = () => {
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const checkCookie = async () => {
    const token = cookie._hltoken;
    if (token) {
      const resp = await fetch("https://api.huelet.net/auth/token", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      console.log(data);
      if (resp.status === 200) {
        console.log(data);
        location.assign("/explore");
        return true;
      } else {
        return false;
      }
    }
  };
  const subheaders = [
    "Huelet makes creators feel safe, connected and supported. And audiences feel like they belong.",
    "Building a video platform for everyone.",
    "We're building the video platform for humans, focused on improving moderation, better privacy, and connecting creators to an audience.",
    "Huelet is an independent video platform for creators and humans to easily communicate and connect in a transparent, organized and understandable way.",
    "Privacy, transparency, and human-centered video platform.",
    "Connect with the creators you love and support them directly by rewarding them when you watch, like and share their videos.",
    "Better moderation, better privacy, better content on the video platform for humans with Huelet.",
  ];
  checkCookie();
  return (
    <div id="klausen">
      <div className={styles.container}>
        <main className={`${styles.mainContent} ${styles.section}`}>
          <h1
            className={`${styles.mainContentText} ${styles.text} ${styles.textBig}`}
          >
            The video platform for humans.
          </h1>
          <div className={styles.divider}></div>
          <p
            className={`${styles.mainContentText} ${styles.text} ${styles.textNormal}`}
          >
            {subheaders[Math.floor(Math.random() * subheaders.length)]}
          </p>
        </main>
        <div className={styles.section}>
          <h2>hi</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
