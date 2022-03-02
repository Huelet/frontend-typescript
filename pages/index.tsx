import type { NextPage } from "next";
import { Lock, Shield } from "react-feather";
import styles from "../styles/Home.module.css";
import { FontSizes, FontWeights, ColorClassNames } from "@fluentui/react";
import Footer from "../components/footer";
import Link from "next/link";
import { useCookies } from "react-cookie"

const Home: NextPage = () => {
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  console.log(cookie);
  if (cookie) {
    console.log("cookie exists");
  }
  return (
    <div id="klausen">
      <div className={styles.mainText}>
        <h2>Hi, we&apos;re Huelet</h2>
      </div>
      <div className={styles.mainText}>
        <h1 className="ms-divAlignCenter ms-fontWeight-light ms-fontSize-68 ms-fontColor-white">
          A smart video platform for creators, viewers, and advertisers.
        </h1>
      </div>
      <div className="watch-now-clears">
        <div className="watch-now-link">
          <Link href="/auth/up" passHref={true}>
            <button className="main-btn">Watch now</button>
          </Link>
        </div>
      </div>
      <div id="desktop">
        <div className="main-si">
          <div className="sp-1-io">
            <div className="sp-1-io-inner">
              <Lock className="icon-lg privacy-icon" />
              <div className="spacer"></div>
              <div className={styles.xCardText}>
                <h2>Privacy</h2>
              </div>
            </div>
            <div className={styles.xCardText}>
              <p>Click on me to learn more!</p>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="sp-1-io">
            <div className="sp-1-io-inner">
              <Shield className="icon-lg mod-icon" />
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
      </div>
      <Footer />
    </div>
  );
};

export default Home;
