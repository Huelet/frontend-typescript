import type { NextPage } from "next";
import { useState } from "react";
import { useCookies } from "react-cookie";
import styles from "../../../styles/Settings.module.css";
import { useToggle } from "@mantine/hooks";
import { Switch } from "@mantine/core";
import { Header } from "../../../components/header";

const Accessibility: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");

  /* settings */
  const [soundsOn, setSoundsOn] = useToggle(true, [true, false]);

  const checkCookie = () => {
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
  };
  if (loading === true) {
    checkCookie();
  } else {
    null;
  }
  return (
    <div id="klausen">
      <Header username="" />

      <div className="main-si cursor">
        <div className="sp-1-eo">
          <div className="sp-1-io p-5">
            <div className="mainText">
              <h2 className={styles.mainText}>Accessibility</h2>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.profile}>
              <div className={styles.profileOptionItem}>
                <Switch
                  label="Sounds"
                  size="md"
                  color="violet"
                  checked={soundsOn}
                  onChange={(event) => setSoundsOn(event.currentTarget.checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
