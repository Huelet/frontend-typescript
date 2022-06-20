import type { NextPage } from "next";
import { useState } from "react";
import Script from "next/script";
import Head from "next/head";
import { ConsentGate } from "@confirmic/react";
import styles from "../styles/ExplorePage.module.css";
import { useCookies } from "react-cookie";
import { Header } from "../components/header";
import { Modal } from "../components/modal";
import { VideoCard } from "../components/video-card";

const Explore: NextPage = () => {
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");
  const [todayVideos, setTodayVideos] = useState([]);
  const [timesClicked, setTimesClicked] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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
  if (timesClicked >= 10) {
    setIsOpen(true);
  }
  const getDate = () => {
    let d = new Date(Date.now());
    return d.getHours() <= 12 ? "Morning" : "Afternoon";
  };
  return (
    <div id="klausen">
      <Head>
        <title>Explore - Huelet - The video platform for humans</title>
        <meta
          name="title"
          content="Explore - Huelet - The video platform for humans"
        />
        <meta
          name="description"
          content="Watch and find new content to watch on huelet.net, the video platform for humans."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Explore - Huelet - The video platform for humans"
        />
        <meta
          property="og:description"
          content="Watch and find new content to watch on huelet.net, the video platform for humans."
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://huelet.net/explore" />
        <meta
          property="twitter:title"
          content="Explore - Huelet - The video platform for humans"
        />
        <meta
          property="twitter:description"
          content="Watch and find new content to watch on huelet.net, the video platform for humans."
        />
      </Head>
      <ConsentGate micropolicy="advanced-analytics">
        <Script id="clarity-as">
          {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "6pivjnysm5");
          `}
        </Script>
      </ConsentGate>
      <ConsentGate micropolicy="basic-analytics">
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      </ConsentGate>
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <Header username={username} />
      <div className={styles.exploreContainer}>
        <div
          onClick={() => {
            setTimesClicked(timesClicked + 1);
          }}
          className={`${styles.exploreWelcome}`}
        >
          <img
            src="https://cdn.huelet.net/assets/logo.png"
            alt="Huelet logo"
            width={32}
            height={32}
            className={`${isOpen ? "hidden" : ""}`}
          />
          <div>
            <video controls className={`${isOpen ? "" : "hidden"}`}>
              <source
                src="https://videos.cdn.huelet.net/asset-025cbdd0-eab3-11eb-8743-35f9dd1b924b/You%20Just%20Got%20Coconut%20Mall%E2%80%99d.mp4?sp=r&st=2022-01-08T16:59:10Z&se=2028-11-01T23:59:10Z&sip=0.0.0.0-255.255.255.255&spr=https&sv=2020-08-04&sr=b&sig=M4%2BA1dZiYCrBEHMjBh051kPcjMRHSy3hOtNdmtG4200%3D"
                type="video/mp4"
              />
            </video>
          </div>
          <h2>Good {getDate()}!</h2>
        </div>
        <div className={styles.mainText}>
          <h2 className={styles.mainText}>
            We&apos;re working on this part. Come back later.
          </h2>
        </div>
        <div className={styles.exploreVideoList}>
          <h2 className={styles.exploreVideoListText}>Today&apos;s videos</h2>
          <div className={styles.videoList}>
            <VideoCard vuid={"x181c2etzrzqvd4o"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
