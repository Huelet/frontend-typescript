/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Player, ControlBar, VolumeMenuButton } from "video-react";
import { Header } from "../../components/header";
import styles from "../../styles/Video.module.css";
import { useCookies } from "react-cookie";
import "react-loading-skeleton/dist/skeleton.css";
import { WarningFilled, ChevronDown, Check } from "@fdn-ui/icons-react";
import { Popover } from "@mantine/core";
import { useSound } from "use-sound";
import { Card, Pill } from "@huelet/foundation-ui";
import { Avatar } from "../../components/avatar";
import Loader from "../../components/loader";
import { Follow } from "../../components/Buttons/follow";
import { VideoCard } from "../../components/video-card";
import { jsx, css } from "@emotion/react";

const ViewVideo: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [safeComment, setSafeComment] = useState(false);
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [videoData, setVideoData]: [any, any] = useState({});
  const [authorData, setAuthorData]: [any, any] = useState({});
  const [username, setUsername] = useState("");
  const [comment, changeComment] = useState("");
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
    const getUserData = async () => {
      const userData = await fetch(`https://api.huelet.net/auth/token`, {
        headers: {
          Authorization: `Bearer ${cookie._hltoken}`,
        },
      });
      setUsername((await userData.json()).username);
    };
    getUserData();
  }, [cookie._hltoken]);
  useEffect(() => {
    const getPageData = async () => {
      const videoResp = await fetch(
        `https://api.huelet.net/videos/lookup/${vuid}`
      );
      const videoRespData = await videoResp.json();
      setVideoData(videoRespData.data);
    };
    getPageData();
  }, [vuid]);
  useEffect(() => {
    const getAuthorData = async () => {
      const authorResp = await fetch(
        `https://api.huelet.net/auth/user?uid=${videoData?.authorId}`
      );
      const authorRespData = await authorResp.json();
      setAuthorData(authorRespData.data);

      setLoading(false);
    };
    getAuthorData();
  }, [videoData]);
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
          {videoData?.title} by {authorData?.username} - Huelet, the video
          platform for humans
        </title>
        <meta
          name="title"
          content={`${videoData?.title} by ${authorData?.username} - Huelet, the video platform for humans`}
        />
        <meta
          name="description"
          content={`${videoData?.title} is a video posted on Huelet, the video platform for humans. Start watching now!"`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://huelet.net/w/${vuid}`} />
        <meta
          property="og:title"
          content={`${videoData?.title} by ${authorData?.username} - Huelet, the video platform for humans`}
        />
        <meta
          property="og:description"
          content={`${videoData?.title} is a video posted on Huelet, the video platform for humans. Start watching now!`}
        />
        <meta property="og:image" content={videoData?.thumbnail} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://huelet.net/w/${vuid}`} />
        <meta
          property="twitter:title"
          content={`${videoData?.title} by ${authorData?.username} - Huelet, the video platform for humans`}
        />
        <meta
          property="twitter:description"
          content={`${videoData?.title} is a video posted on Huelet, the video platform for humans. Start watching now!`}
        />
        <meta property="twitter:image" content={videoData?.img} />
      </Head>
      <Header username={username} />
      <div className="spacer-sm"></div>
      <article>
        <MobileView>
          <Player
            playsInline
            fluid={true}
            width={typeof window !== "undefined" ? window.innerWidth : 0}
            height={
              typeof window !== "undefined"
                ? Math.round(window.innerHeight / 2)
                : 0
            }
            poster={videoData?.thumbnail}
          >
            <source src={videoData?.vurl_webm} type="video/webm" />
            <source src={videoData?.vurl_mp4} type="video/mp4" />
            <source src={videoData?.url} type="video/mp4" />
          </Player>
          <h2>{videoData?.title}</h2>
          <div
            css={css({
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              border: "rgb(50, 49, 48) solid 0.1em",
              borderRadius: "0.5em",
              padding: "1em",
            })}
          >
            <div
              css={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              })}
            >
              <Avatar username={authorData?.username} dimensions={64} />
            </div>
            <div
              css={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5em",
              })}
            >
              <span
                css={css({
                  display: "flex",
                  flexDirection: "column",
                })}
              >
                <Link href={`/c/@${authorData?.username}`} passHref={true}>
                  <h3>{authorData?.username}</h3>
                </Link>
                <p>{authorData?.followers} followers</p>
                <Follow />
              </span>
            </div>
            <div
              css={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5em",
              })}
            >
              <Pill type="primary">{videoData?.vviews} views</Pill>
              <div className="spacer-sm"></div>
              <Pill type="primary">{videoData?.vuploaded}</Pill>
            </div>
            <div
              css={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                cursor: "pointer",
              })}
            >
              <div
                css={css({
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0.5em",
                  border: "#eee solid 0.1em",
                  borderRadius: "50%",
                })}
              >
                <ChevronDown fill="white" />
              </div>
            </div>
          </div>
          <div
            css={css({
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5em",
            })}
          >
            <VideoCard vuid={undefined} />
            <div className="spacer-sm"></div>
            <VideoCard vuid={undefined} />
          </div>
        </MobileView>
        <BrowserView>
          <main
            css={css({
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
            })}
          >
            <Card
              css={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1em",
                border: "0.25em solid var(--hueletColor) !important",
              })}
              padding={3}
            >
              <div
                css={css({
                  padding: "1.3em 4.3em",
                })}
              >
                <h2
                  css={css({
                    padding: "0 0 0.7em 0.7em",
                    fontSize: "2.3em",
                  })}
                >
                  Comments
                </h2>
                <div
                  css={css({
                    padding: "0 0 3em 3em",
                  })}
                >
                  {/* editor here */}
                  <div
                    css={css({
                      width: "5em",
                      float: "right",
                    })}
                  >
                    <div
                      className={`button-primary`}
                      css={css({
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      })}
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
                        <div
                          css={css({
                            display: "flex",
                            flexDirection: "row",
                            padding: "1em",
                            fontFamily: "'Red Hat Text', sans-serif",
                          })}
                        >
                          <div
                            css={css({
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              width: "3.5em",
                              height: "3em",
                              padding: "0.5em",
                              borderRadius: "50%",
                              background: "#ff0077",
                            })}
                          >
                            <WarningFilled fill="white" />
                          </div>
                          <div
                            css={css({
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              width: "100%",
                              height: "100%",
                              paddingLeft: "1em",
                            })}
                          >
                            <h2
                              css={css({
                                fontSize: "2em",
                              })}
                            >
                              Are you sure you want to post this comment?
                            </h2>
                            <p>
                              Want to double-check this comment? We&apos;re
                              asking people to review content that may be
                              sensitive.
                              <br />
                              <p
                                css={css({
                                  paddingTop: "0.5em",
                                  fontWeight: "900",
                                })}
                              >
                                Please remember the human behind the screen.
                              </p>
                              <br />
                              <span>
                                If you&apos;re sure, click the button below.
                                <div
                                  className={`button-primary`}
                                  css={css({
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "1em",
                                  })}
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
              </div>
              <div
                css={css({
                  padding: "4em",
                })}
              >
                <p></p>
              </div>
            </Card>
            <div>
              <div
                css={css({
                  padding: "2em",
                })}
              >
                <h1
                  css={css({
                    fontSize: "3em",
                  })}
                >
                  {videoData?.title}
                </h1>
                <div
                  css={css({
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "15px",
                    padding: "2em",
                    width: "800px",
                    height: "430px",
                  })}
                >
                  <Player
                    key={
                      videoData?.vurl_webm ||
                      videoData?.vurl_mp4 ||
                      videoData?.url ||
                      ""
                    }
                    fluid={true}
                    width={830}
                    height={400}
                    css={css({
                      paddingTop: "56% !important",
                      borderRadius: "15px",
                    })}
                    poster={videoData?.thumbnail}
                  >
                    <source src={videoData?.vurl_webm} type="video/webm" />
                    <source src={videoData?.vurl_mp4} type="video/mp4" />
                    <source src={videoData?.url} type="video/mp4" />
                    <ControlBar>
                      <VolumeMenuButton disabled />
                    </ControlBar>
                  </Player>
                </div>
              </div>
              <div
                css={css({
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "2em",
                  border: "1px solid #e6e6e6",
                  borderRadius: "15px",
                })}
              >
                <Link href={`/c/@${authorData?.username}`} passHref={true}>
                  <div
                    css={css({
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    })}
                  >
                    <Avatar username={authorData?.username} dimensions={128} />
                    <div
                      css={css({
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "1em",
                      })}
                    >
                      {authorData?.approved ? (
                        <>
                          <span
                            css={css({
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            })}
                          >
                            <h2>@{authorData?.username}</h2>
                            <Check
                              fill="green"
                              css={css({
                                marginLeft: "0.5em",
                              })}
                            />
                          </span>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: authorData?.bio,
                            }}
                          ></div>
                        </>
                      ) : (
                        <>
                          <h2>@{authorData?.username}</h2>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: authorData?.bio,
                            }}
                          ></div>
                        </>
                      )}
                      <Follow />
                    </div>
                  </div>
                </Link>
                <div
                  css={css({
                    display: "flex",
                    flexDirection: "row",
                  })}
                >
                  <div
                    css={css({
                      display: "flex",
                      flexDirection: "column",
                    })}
                  >
                    <Pill type="primary">
                      {videoData?.views === 1
                        ? `${videoData?.views} view`
                        : `${videoData?.views} views`}
                    </Pill>
                    <div className="spacer-sm"></div>
                    <Pill type="primary">
                      {videoData?.createdAt
                        ? new Date(videoData?.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </Pill>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </BrowserView>
      </article>
    </div>
  );
};

export default ViewVideo;
