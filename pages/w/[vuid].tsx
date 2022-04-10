import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";
import { Player } from "video-react";
import { Header } from "../../components/header";
import styles from "../../styles/Video.module.css";
import Link from "next/link";
import { useCookies } from "react-cookie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ViewVideo: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
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
  getUserData();
  getData();
  return (
    <SkeletonTheme baseColor="#4E4E4E" highlightColor="#686868">
      <div id="klausen">
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
                  <img
                    src="https://cdn.huelet.net/assets/icons/forward.svg"
                    alt="A forward-facing arrow"
                    className={`${styles.videoDetailsOptionsShareImg}`}
                    draggable="false"
                    data-type="icon"
                  ></img>
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
            <div></div>
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
