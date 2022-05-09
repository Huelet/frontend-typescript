import type { NextPage } from "next";
import { SetStateAction, useState } from "react";
import styles from "../../styles/Signup.module.css";
import { useCookies } from "react-cookie";

const AuthIn: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
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
              </div>
              <div className="spacer"></div>
              <button className={"button-primary"} id="submit" type="submit">
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
