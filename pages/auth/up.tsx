import type { NextPage } from "next";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import styles from "../../styles/Signup.module.css";
import ReactTooltip from "react-tooltip";
import { useCookies } from "react-cookie";
import { Add, Info } from "@fdn-ui/icons-react";

const AuthUp: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [pwgResponse, setPwgResponse] = useState("");
  const [JWTcookie, setJWTCookie] = useCookies(["_hltoken"]);
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
    fetch("https://www.random.org/passwords/?num=1&len=12&format=plain&rnd=new")
      .then((res) => res.text())
      .then((res) => {
        navigator.clipboard.writeText(res);
        setPwgResponse("Copied to clipboard!");
      });
  }
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const resp = await fetch("https://api.huelet.net/auth/up", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          accessCode: accessCode,
        }),
      });
      const data = await resp.json();
      console.log(data);
      if (resp.status === 200) {
        setJWTCookie(
          "_hltoken",
          data.token, 
          {
            path: "/"
        });
        location.assign("/explore");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="klausen">
      <div className="main-si">
        <div className="sp-1-eo">
          <div className="sp-1-io p-5">
            <div className={styles.mainText}>
              <h2 className="klausen-title">Sign up for Huelet!</h2>
            </div>
            <div className={styles.mainText}>
              <p className="klausen-subtitle">
                We only need a username and password{" "}
              </p>
            </div>
            <form id="form" onSubmit={handleSubmit}>
              <input
                className={styles.input}
                id="username"
                type="div"
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
                    <Add fill={"white"} />
                  </div>
                </a>
              </div>
              <div className="spacer-sm"></div>
              <ReactTooltip />
              <div className="flex">
                <input
                  className={styles.input}
                  id="accessCode"
                  type="div"
                  name="accessCode"
                  placeholder="Alpha code"
                  onChange={handleAccessCodeChange}
                  value={accessCode}
                />
                <div
                  className={"cursor"}
                  data-tip="We will have sent you a DM with this code. If you don't have it, please let us know."
                >
                  <Info fill={"white"} />
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
            <Info fill={"white"} />
          </div>
        </a>
        <div className={styles.pwgModalContent}>
          <div className="sp-1-eo">
            <div className="sp-1-io p-5">
              <div className={styles.mainText}>
                <h2>Generate a password</h2>
              </div>
              <div className={styles.mainText}>
                <p className="pwg-subtitle">
                  Generate a password for your account
                </p>
              </div>
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
                  <div className={styles.mainText}>{pwgResponse}</div>
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
