import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import type { NextPage } from "next";
import { useState } from "react";
import { ConsentGate } from "@confirmic/react";
import { Player } from "video-react";
import { Header } from "../../components/header";
import styles from "../../styles/Video.module.css";
import Link from "next/link";
import { useCookies } from "react-cookie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Forward } from "@fdn-ui/icons-react";

const ViewVideo: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authorUsername, setAuthorUsername] = useState("");
  const [uploadedDate, setUploadedDate] = useState("");
  const [views, setViews] = useState(0);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [shares, setShares] = useState(0);
  const router = useRouter();
  const { vuid } = router.query;
  const getUserData = () => {
    fetch(`https://api.huelet.net/auth/token`, {
      headers: {
        Authorization: `Bearer ${cookie._hltoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      });
  };
  function getData() {
    fetch(`https://api.huelet.net/videos/${vuid}`)
      .then((resp: Response) => resp.json())
      .then((data: any) => {
        console.log(data);
        setUrl(data.vurl);
        setTitle(data.vtitle);
        // date tends to have issues so i added a catch, please do not edit this!
        setUploadedDate(data.vdata || "undefined");
        setViews(data.vviews);
        setUpvotes(data.vclaps);
        setDownvotes(data.vcraps);
        setShares(data.vshares);
        setAuthorId(data.vauthor);
        setTimeout(() => {
          fetch(`https://api.huelet.net/auth/user/${data.authorId}`)
            .then((resp: Response) => resp.json())
            .then((data: any) => {
              setAuthorUsername(data.username);
            });
          setLoading(false);
        }, 100);
      });
  }
  const addClap = async () => {
    const resp = await fetch(
      `https://api.huelet.net/videos/interact/upvote/${vuid}`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: cookie._hltoken,
        }),
      }
    );
    console.log(resp);
  };
  const addCrap = async () => {
    const resp = await fetch(
      `https://api.huelet.net/videos/interact/downvote/${vuid}`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: cookie._hltoken,
        }),
      }
    );
    console.log(resp);
  };
  if (loading === true) {
    getUserData();
    getData();
  } else {
    null;
  }
  return (
    <SkeletonTheme baseColor="#4E4E4E" highlightColor="#686868">
      <div id="klausen">
        <Head>
          <title>
            {title} by {authorUsername} - Huelet, the video platform for humans
          </title>
          <meta
            name="title"
            content={`${title} by ${authorUsername} - Huelet, the video platform for humans`}
          />
          <meta
            name="description"
            content={`${title} is a video posted on Huelet, the video platform for humans. Start watching now!"`}
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://huelet.net/w/${vuid}`} />
          <meta
            property="og:title"
            content={`${title} by ${authorUsername} - Huelet, the video platform for humans`}
          />
          <meta
            property="og:description"
            content={`${title} is a video posted on Huelet, the video platform for humans. Start watching now!`}
          />
          <meta property="og:image" content={thumbnail} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content={`https://huelet.net/w/${vuid}`}
          />
          <meta
            property="twitter:title"
            content={`${title} by ${authorUsername} - Huelet, the video platform for humans`}
          />
          <meta
            property="twitter:description"
            content={`${title} is a video posted on Huelet, the video platform for humans. Start watching now!`}
          />
          <meta property="twitter:image" content={thumbnail} />
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
        <div className="spacer-sm"></div>
        <article>
          {loading ? (
            <Skeleton width={800} height={430} />
          ) : (
            <div className={styles.videoWrapper}>
              <Player src={url} playsInline className={styles.videoPlayer} />
            </div>
          )}
          <div className={`${styles.videoDetails}`}>
            <h1 className={`${styles.videoDetailsTitle}`}>{title}</h1>
            <div className={`${styles.videoDetailsOptions}`}>
              {loading ? (
                <Skeleton width={50} height={40} />
              ) : (
                <div
                  className={`${styles.videoDetailsOptionsReactionPositive} ${styles.videoDetailsOptionsReaction} ${styles.videoDetailsOptionsReactionActive}`}
                  style={{
                    backgroundColor: "#436072",
                  }}
                  onClick={addClap}
                >
                  <img
                    src="https://cdn.huelet.net/assets/emoji/1F44F.svg"
                    alt="Yellow hands clapping"
                    className={`${styles.videoDetailsOptionsReactionPositiveImg}`}
                    draggable="false"
                    data-type="emoji"
                  ></img>
                  <span>{upvotes}</span>
                </div>
              )}
              {loading ? (
                <Skeleton width={50} height={40} />
              ) : (
                <div
                  className={`${styles.videoDetailsOptionsReactionNegative} ${styles.videoDetailsOptionsReaction}`}
                  onClick={addCrap}
                >
                  <img
                    src="https://cdn.huelet.net/assets/emoji/1F4A9.svg"
                    alt="Brown poop"
                    className={`${styles.videoDetailsOptionsReactionNegativeImg}`}
                    draggable="false"
                    data-type="emoji"
                  ></img>
                  <span>{downvotes}</span>
                </div>
              )}
              {loading ? (
                <Skeleton width={50} height={40} />
              ) : (
                <div
                  className={`${styles.videoDetailsOptionsShare} ${styles.videoDetailsOptionsReaction}`}
                >
                  <Forward fill={"white"} />
                  <span>{shares}</span>
                </div>
              )}
            </div>
            {loading ? (
              <Skeleton width={870} height={50} />
            ) : (
              <Link href={`https://huelet.net/c/${authorId}`} passHref>
                <h2 className={`${styles.videoDetailsAuthor}`}>
                  By {authorUsername}
                </h2>
              </Link>
            )}
            {loading ? (
              <Skeleton width={100} height={20} />
            ) : (
              <div className={styles.videoAttributes}>
                <span className={`${styles.videoAttributes1}`}>
                  Uploaded: {uploadedDate}
                </span>
                <span className={`${styles.videoAttributesSpacerText}`}>
                  &nbsp;|&nbsp;
                </span>
                <span className={`${styles.videoAttributes2}`}>
                  Views: {views}
                </span>
              </div>
            )}
          </div>
          <div className={`${styles.videoComments}`}>
            <h2 className={`${styles.videoCommentsHeading}`}>Comments</h2>
            <div className={`${styles.videoCommentsBox}`}>
              <textarea className={`${styles.videoCommentsBoxText}`}></textarea>
              <div className={`${styles.videoCommentsBoxSubmit}`}>
                <button
                  type="submit"
                  className={`${styles.videoCommentsBoxSubmitButton}`}
                >
                  Post
                </button>
              </div>
            </div>
            <div>
              {loading ? (
                <Skeleton width={870} height={50} />
              ) : (
                <div className={`${styles.videoCommentsList}`}>
                  {/*comments.map((comment) => (
                    <div className={`${styles.videoCommentsListItem}`}>
                      <div className={`${styles.videoCommentsListItemAuthor}`}>
                        <Link href={`https://huelet.net/c/${comment.authorId}`} passHref>
                          <a>{comment.authorUsername}</a>
                        </Link>
                      </div>
                        <div className={`${styles.videoCommentsListItemAuthorDate}`}>
                          {comment.date}
                        </div>
                        <div className={}></div>
                    </div>
                  )) */}
                </div>
              )}
            </div>
          </div>
        </article>
        <aside>
          <div className="adFrame--rightAsideColumn">hi!! i&apos;m an ad!</div>
        </aside>
      </div>
    </SkeletonTheme>
  );
};

export default ViewVideo;
