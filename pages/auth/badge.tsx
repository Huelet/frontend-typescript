import React from "react";
import type { NextPage } from "next";
import { Card } from "../../components/card";
import { useCookies } from "react-cookie";
import { Header } from "../../components/header";
import Image from "next/image";

const Badge: NextPage = () => {
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);
  const [dataUrl, setDataUrl] = React.useState("");
  React.useEffect(() => {
    const token = cookie._hltoken;
    if (token) {
      fetch("https://api.huelet.net/auth/token", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.response === "Success!") {
            setUsername(res.username);
          } else {
            console.log("error: ", res);
          }
        });
    }
  }, [cookie._hltoken]);
  React.useEffect(() => {
    const getBadge = async () => {
      const badge = await fetch(
        `https://api.huelet.net/auth/badge?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie._hltoken}`,
          },
        }
      );
      console.log((await badge.json()).data.badge);
      setDataUrl((await badge.json()).data.badge);
      setLoaded(true);
    };
    if (username) {
      getBadge();
    } else {
      null;
    }
  }, [cookie._hltoken, username]);
  return (
    <div id="klausen">
      <Header username={username} />
      <Card full={true} title="Get your badge!">
        <div className={loaded ? "hidden" : ""}>Loading...</div>
        <div
          className={loaded ? "" : "hidden"}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={dataUrl}
            alt="A portrait image of your profile picture, your username, and the date you signed up for Huelet."
          />
          <a href={dataUrl} download={true}>
            <button className="button-primary">Download</button>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Badge;
