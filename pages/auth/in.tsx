import type { NextPage } from "next";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import styles from "../../styles/Signup.module.css";
import ReactTooltip from "react-tooltip";
import { FontWeights, ColorClassNames } from "@fluentui/react";

const AuthIn: NextPage = () => {
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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const resp = await fetch("https://api.huelet.net/auth/in", {
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
    console.log(resp);
    if (resp.status === 200) {
      location.assign("/explore");
    }
  };
  return (
    <div id="klausen">
      <div className="main-si">
        <div className="sp-1-eo">
          <div className="sp-1-io p-5">
            <div className={styles.mainText}>
              <h2 className="klausen-title">Sign into Huelet</h2>
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
                    <Image
                      src={"https://cdn.huelet.net/assets/icons/add.svg"}
                      alt="Open password generate modal"
                      width={15}
                      height={15}
                      loader={() => {
                        return "https://cdn.huelet.net/assets/icons/add.svg";
                      }}
                      className={styles.pwgTriggerIcon}
                    />
                  </div>
                </a>
              </div>
              <div className="spacer-sm"></div>
              <ReactTooltip />

              <div className="spacer"></div>
              <button className={styles.submit} id="submit" type="submit">
                Sign In
              </button>
              <div id="error-box"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthIn;
