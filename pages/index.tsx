import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { ConsentGate } from "@confirmic/react";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import { Secure, Eye, Close } from "@fdn-ui/icons-react";
import Link from "next/link";
import { useCookies } from "react-cookie";

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
  checkCookie();
  return (
    <div id="klausen">
      <div id="i-privacy-modal" className={styles.privacyModal}>
        <div className={styles.closeModal}>
          <Close className="icon-lg privacy-icon" fill={"white"} />
        </div>
      </div>
      <Head>
        <title>Huelet - The video platform for humans</title>
        <link rel="preload" href="https://cdn.huelet.net" />
        <link rel="icon" href="https://cdn.huelet.net/assets/logo.png" />
        <meta
          name="description"
          content="Huelet is a video platform for humans. It's a place where you can share your videos with the world."
        />
        <meta
          property="og:title"
          content="Huelet - The video platform for humans"
        />
        <meta
          property="og:description"
          content="Huelet is a video platform for humans. It's a place where you can share your videos with the world."
        />
        <meta
          property="og:image"
          content="https://cdn.huelet.net/assets/logo.png"
        />
        <meta property="og:url" content="https://huelet.net" />
        <meta property="og:type" content="website" />
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
      <div className={styles.mainText}>
        <h2>Hi, we&apos;re Huelet</h2>
      </div>
      <div className={styles.mainText}>
        <h1>The video platform for humans</h1>
      </div>
      <div className="watch-now-clears">
        <div className="watch-now-link">
          <Link href="/auth/up" passHref={true}>
            <button className="main-btn">Watch now</button>
          </Link>
        </div>
      </div>
      <div className="main-si">
        <div className="sp-1-io">
          <a href="#i-privacy-modal" style={{ textDecoration: "none" }}>
            <div className="sp-1-io-inner">
              <Secure className="icon-lg privacy-icon" fill={"white"} />
              <div className="spacer"></div>
              <div className={styles.xCardText}>
                <h2>Privacy</h2>
              </div>
            </div>
            <div className={styles.xCardText}>
              <p>Click on me to learn more!</p>
            </div>
          </a>
        </div>
        <div className="sp-1-io">
          <div className="sp-1-io-inner">
            <Eye className="icon-lg mod-icon" fill={"white"} />
            <div className="spacer"></div>
            <div className={styles.xCardText}>
              <h2 className="ms-divAlignCenter ms-fontSize-42">Moderation</h2>
            </div>
          </div>
          <div className={styles.xCardText}>
            <p>Click on me to learn more!</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
