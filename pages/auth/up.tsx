import type { NextPage } from "next";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import styles from "../../styles/Signup.module.css";
import ReactTooltip from "react-tooltip";
import { FontWeights, Text, ColorClassNames } from "@fluentui/react";

const AuthUp: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [pwgResponse, setPwgResponse] = useState("");
  const handleUsernameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };
  const handleAccessCodeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setAccessCode(event.target.value);
  };
  function getRandomPassword() {
    fetch(
      "https://www.random.org/strings/?num=1&len=16&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new"
    )
      .then((res) => res.text())
      .then((res) => {
        navigator.clipboard.writeText(res);
        setPwgResponse("Copied to clipboard!");
      });
  }
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const resp = await fetch("https://api.huelet.net/auth/up", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "accessCode": accessCode,
      }),
    })
    console.log(resp);
    if (resp.status === 200) {
        location.assign("/explore")
    }
  };
  return (
    <div id="klausen">
      <div className="main-si">
        <div className="sp-1-eo">
          <div className="sp-1-io p-5">
            <Text
              styles={{
                root: {
                  color: ColorClassNames.white,
                  fontWeight: FontWeights.light,
                },
              }}
            >
              <h2 className="klausen-title">Sign up for Huelet!</h2>
            </Text>
            <Text
              styles={{
                root: {
                  color: ColorClassNames.white,
                  fontWeight: FontWeights.light,
                },
              }}
            >
              <p className="klausen-subtitle">
                We only need a username and password{" "}
              </p>
            </Text>
            <form id="form" onSubmit={handleSubmit}>
              <input
                className={styles.input}
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleUsernameChange}
                value={username}
              />
              <div className="spacer-sm"></div>
              <div className="pwd-input flex">
                <input
                  className={styles.input}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  value={password}
                />
                <div className="spacer-sm"></div>
                <a href="#pwg-modal">
                  <div className={`${styles.pwgTrigger} cursor`}>
                    <Image
                      src={"https://cdn.huelet.net/assets/icons/add.svg"}
                      alt="Open password generate modal"
                      width={15}
                      height={15}
                      className={styles.pwgTriggerIcon}
                    />
                  </div>
                </a>
              </div>
              <div className="spacer-sm"></div>
              <ReactTooltip />
              <div className="flex">
                <input
                  className={styles.input}
                  id="accessCode"
                  type="text"
                  name="accessCode"
                  placeholder="Alpha code"
                  onChange={handleAccessCodeChange}
                  value={accessCode}
                />
                <div
                  className={"cursor"}
                  data-tip="We will have sent you a DM with this code. If you don't have it, please let us know."
                >
                  <Image
                    src={"https://cdn.huelet.net/assets/icons/info.svg"}
                    alt="Open tooltip"
                    width={15}
                    height={15}
                    className={styles.pwgTriggerIcon}
                  />
                </div>
              </div>
              <div className="spacer"></div>
              <button className={styles.submit} id="submit" type="submit">
                Sign up
              </button>
              <div id="error-box"></div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.pwgModal} id="pwg-modal">
        <a href="#">
          <div className={styles.pwgModalClose}>
            <Image
              src={"https://cdn.huelet.net/assets/icons/close.svg"}
              alt="Close password generate modal"
              width={10}
              height={10}
            />
          </div>
        </a>
        <div className={styles.pwgModalContent}>
          <div className="sp-1-eo">
            <div className="sp-1-io p-5">
              <Text
                styles={{
                  root: {
                    color: ColorClassNames.white,
                    fontWeight: FontWeights.light,
                  },
                }}
              >
                <h2>Generate a password</h2>
              </Text>
              <Text
                styles={{
                  root: {
                    color: ColorClassNames.white,
                    fontWeight: FontWeights.light,
                  },
                }}
              >
                <p className="pwg-subtitle">
                  Generate a password for your account
                </p>
              </Text>
              <button
                className={styles.submit}
                id="pwg-submit"
                onClick={getRandomPassword}
              >
                Generate
              </button>
              <div className="spacer.sm"></div>
              <div className="sp-1-io">
                <div className="p-5" id="pwg-response">
                  <Text styles={{ root: { color: ColorClassNames.white } }}>
                    {pwgResponse}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthUp;
