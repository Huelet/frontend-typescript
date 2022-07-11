import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  Player,
  ControlBar,
  VolumeMenuButton,
  LoadingSpinner,
  PlayToggle,
} from "video-react";
import { Header } from "../../components/header";
import { Editor } from "../../components/editor";
import styles from "../../styles/Video.module.css";
import { useCookies } from "react-cookie";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Forward,
  Play,
  Pause,
  WarningFilled,
  Copy,
  Mail,
} from "@fdn-ui/icons-react";
import Loader from "../../components/loader";
import { Modal, Popover, Popper } from "@mantine/core";
import { useSound } from "use-sound";

const ViewVideo: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [safeComment, setSafeComment] = useState(false);
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [comments, setComments]: any = useState([]);
  const [authorUsername, setAuthorUsername] = useState("");
  const [uploadedDate, setUploadedDate] = useState("");
  const [comment, changeComment] = useState("");
  const [views, setViews] = useState(0);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [shares, setShares] = useState(0);
  const [shareModal, toggleShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copyPopover, toggleCopyPopover] = useState(false);
  const [mailPopover, toggleMailPopover] = useState(false);
  const [facebookPopover, toggleFacebookPopover] = useState(false);
  const [twitterPopover, toggleTwitterPopover] = useState(false);
  /* sounds */
  const [playBgSound] = useSound(
    "https://cdn.huelet.net/assets/sounds/Windows%20Background.wav",
    { volume: 1 }
  );
  const [playClickSound] = useSound(
    "https://cdn.huelet.net/assets/sounds/Windows%20Hardware%20Fail.wav",
    { volume: 1 }
  );
  const [playSubmitSound] = useSound(
    "https://cdn.huelet.net/assets/sounds/Windows%20Hardware%20Insert.wav",
    { volume: 1 }
  );
  const router = useRouter();
  const { vuid } = router.query;
  
  useEffect(() => {
    fetch(`https://api.huelet.net/auth/token`, {
      headers: {
        Authorization: `Bearer ${cookie._hltoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      });
    fetch(`https://api.huelet.net/videos/${vuid}`)
      .then((resp: Response) => resp.json())
      .then((data: any) => {
        setUrl(data.vurl);
        setTitle(data.vtitle);
        // date tends to have issues so i added a catch, please do not edit this!
        setUploadedDate(data.vdata || "undefined");
        setViews(data.vviews);
        setUpvotes(data.vclaps);
        setDownvotes(data.vcraps);
        setShares(data.vshares);
        setAuthorId(data.vauthor);
        setComments(data.vcomments || ["no comments yet"]);
        setLoading(false);

        fetch(`https://api.huelet.net/auth/user?uid=${authorId}`).then(
          (resp: Response) => console.log(resp)
        );
      });
  }, [authorId, cookie._hltoken, vuid]);
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
  };
  const submitComment = async () => {
    setCommentSubmitted(true);
    const safetyCheck = await fetch(
      `https://westus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?autocorrect=true&PII=true&classify=true&language=eng`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        headers: {
          "Content-Type": "text/plain",
          "Ocp-Apim-Subscription-Key": "0bb07c0b41e149edaf8bde43f83bc3c5",
        },
        body: comment,
      }
    );
    const safetyCheckData = await safetyCheck.json();
    if (
      safetyCheckData.Classification.Category1.Score >= 0.9 ||
      safetyCheckData.Classification.Category2.Score >= 0.9 ||
      safetyCheckData.Classification.Category3.Score >= 0.98
    ) {
      setSafeComment(true);
    } else {
      setSafeComment(false);
      await pushComment();
    }
    setCommentSubmitted(false);
  };
  const pushComment = async () => {
    const resp = await fetch(
      `https://api.huelet.net/videos/interact/comments/${vuid}`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie._hltoken}`,
        },
        body: JSON.stringify({
          username: username,
          content: comment,
        }),
      }
    );
    const data = await resp.json();
    if (data.success === true) {
      window.location.reload();
    }
  };
  return (
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
        <meta property="twitter:url" content={`https://huelet.net/w/${vuid}`} />
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
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
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
        <div className={styles.videoWrapper}>
          <Player
            src={url}
            playsInline
            fluid={isMobile ? true : false}
            width={830}
            height={400}
            className={styles.videoPlayer}
          >
            <LoadingSpinner>
              <Loader />
            </LoadingSpinner>
            <ControlBar>
              <PlayToggle>
                <Play />
                <Pause />
              </PlayToggle>
              <VolumeMenuButton disabled />
            </ControlBar>
          </Player>
        </div>
        <div className={`${styles.videoDetails}`}>
          <h1 className={`${styles.videoDetailsTitle}`}>{title}</h1>
          <div className={`${styles.videoDetailsOptions}`}>
            <div
              className={`${styles.videoDetailsOptionsReactionPositive} ${styles.videoDetailsOptionsReaction} ${styles.videoDetailsOptionsReactionActive}`}
              style={{
                backgroundColor: "#436072",
              }}
              onClick={() => {
                addClap;
                playClickSound();
              }}
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
            <div
              className={`${styles.videoDetailsOptionsReactionNegative} ${styles.videoDetailsOptionsReaction}`}
              onClick={() => {
                addCrap;
                playClickSound();
              }}
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
            <div
              className={`${styles.videoDetailsOptionsShare} ${styles.videoDetailsOptionsReaction}`}
              onClick={() => {
                playClickSound();
                toggleShareModal(true);
              }}
            >
              <Forward fill={"white"} />
              <span>{shares}</span>
            </div>
            <Modal
              opened={shareModal}
              onClose={() => toggleShareModal(false)}
              title="Share this video"
            >
              <div className={`${styles.videoDetailsOptionsShareModal}`}>
                <div className={`${styles.videoDetailsShareReaction}`}>
                  <Popover
                    opened={copyPopover}
                    onClose={() => toggleCopyPopover(false)}
                    target={
                      <Copy
                        fill={"white"}
                        onMouseEnter={() => toggleCopyPopover(true)}
                        onMouseLeave={() => toggleCopyPopover(false)}
                      />
                    }
                    position="bottom"
                    placement="center"
                    trapFocus={false}
                    closeOnEscape={false}
                    transition="pop-top-left"
                  >
                    <span>Copy link</span>
                  </Popover>
                </div>
                <div className={`${styles.videoDetailsShareReaction}`}>
                  <Popover
                    opened={mailPopover}
                    onClose={() => toggleMailPopover(false)}
                    target={
                      <Mail
                        fill={"white"}
                        onMouseEnter={() => toggleMailPopover(true)}
                        onMouseLeave={() => toggleMailPopover(false)}
                      />
                    }
                    position="bottom"
                    placement="center"
                    trapFocus={false}
                    closeOnEscape={false}
                    transition="pop-top-left"
                  >
                    <span>Email</span>
                  </Popover>
                </div>
                <div className={`${styles.videoDetailsShareReaction}`}>
                  <Popover
                    opened={facebookPopover}
                    onClose={() => toggleFacebookPopover(false)}
                    target={
                      <svg
                        onMouseEnter={() => toggleFacebookPopover(true)}
                        onMouseLeave={() => toggleFacebookPopover(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    }
                    position="bottom"
                    placement="center"
                    trapFocus={false}
                    closeOnEscape={false}
                    transition="pop-top-left"
                  >
                    <span>Facebook</span>
                  </Popover>
                </div>
                <div className={`${styles.videoDetailsShareReaction}`}>
                  <Popover
                    opened={twitterPopover}
                    onClose={() => toggleTwitterPopover(false)}
                    target={
                      <svg
                        onMouseEnter={() => toggleTwitterPopover(true)}
                        onMouseLeave={() => toggleTwitterPopover(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    }
                    position="bottom"
                    placement="center"
                    trapFocus={false}
                    closeOnEscape={false}
                    transition="pop-top-left"
                  >
                    <span>Twitter</span>
                  </Popover>
                </div>
              </div>
            </Modal>
          </div>
          <Link href={`https://huelet.net/c/${authorId}`} passHref>
            <h2 className={`${styles.videoDetailsAuthor}`}>
              By {authorUsername}
            </h2>
          </Link>
          <div className={styles.videoAttributes}>
            <span className={`${styles.videoAttributes1}`}>
              Uploaded: {uploadedDate}
            </span>
            <span className={`${styles.videoAttributesSpacerText}`}>
              &nbsp;|&nbsp;
            </span>
            <span className={`${styles.videoAttributes2}`}>Views: {views}</span>
          </div>
        </div>
        <div className={`${styles.videoComments}`}>
          <h2 className={`${styles.videoCommentsHeading}`}>Comments</h2>
          <div className={`${styles.videoCommentsBox}`}>
            <Editor output={changeComment} value={comment} />
            <div className={`${styles.videoCommentsBoxSubmit}`}>
              <div
                className={`${styles.videoCommentsBoxSubmitButton}`}
                onClick={() => {
                  submitComment();
                  playSubmitSound();
                }}
              >
                <div
                  className={
                    commentSubmitted
                      ? "video-details-comments-box-submit-button-text"
                      : "hidden"
                  }
                >
                  <Loader />
                </div>
                <p
                  className={
                    commentSubmitted
                      ? "hidden"
                      : "video-details-comments-box-submit-button-text"
                  }
                >
                  Post
                </p>
                <Popover
                  opened={safeComment}
                  onClose={() => setSafeComment(false)}
                  width={260}
                  position="bottom"
                  withArrow
                  target={undefined}
                >
                  <div className={`${styles.unsafeContentPopup}`}>
                    <div className={`${styles.unsafeContentPopupIcon}`}>
                      <WarningFilled fill="white" />
                    </div>
                    <div className={`${styles.unsafeContentPopupText}`}>
                      <h2 className={`${styles.unsafeContentPopupTextTitle}`}>
                        Are you sure you want to post this comment?
                      </h2>
                      <p
                        className={`${styles.unsafeContentPopupTextDescription}`}
                      >
                        Want to double-check this comment? We&apos;re asking
                        people to review content that may be sensitive.
                        <br />
                        <p
                          className={`${styles.unsafeContentPopupTextDescriptionHighlighted}`}
                        >
                          Please remember the human behind the screen.
                        </p>
                        <br />
                        <span
                          className={`${styles.unsafeContentPopupTextDescriptionMore}`}
                        >
                          If you&apos;re sure, click the button below.
                          <div
                            className={`${styles.videoCommentsBoxSubmitButton}`}
                            onClick={pushComment}
                          >
                            I&apos;m sure
                          </div>
                          <br />
                          <Link href="https://docs.huelet.net/users/comment-verification">
                            Read more.
                          </Link>
                        </span>
                      </p>
                    </div>
                  </div>
                </Popover>
              </div>
            </div>
          </div>
          <div>
            <div className={`${styles.videoCommentsList}`}>
              <p
                dangerouslySetInnerHTML={{
                  __html: comments.map(
                    ({
                      content,
                      id,
                      upvotes,
                      downvotes,
                      commentPublished,
                      author,
                    }) => {
                      return <p key={content}>{content}</p>;
                    }
                  ),
                }}
              ></p>
            </div>
          </div>
        </div>
      </article>
      <aside>
        <div className="adFrame--rightAsideColumn">hi!! i&apos;m an ad!</div>
      </aside>
    </div>
  );
};

export default ViewVideo;
