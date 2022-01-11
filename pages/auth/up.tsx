import type { NextPage } from "next";
import { useState } from "react";
import styles from "../../styles/Signup.module.css";
import { FontWeights, Text, ColorClassNames } from '@fluentui/react';


const AuthUp: NextPage = () => {
    const [pwgResponse, setPwgResponse] = useState("Next");
    function getRandomPassword() {
        fetch('https://www.random.org/strings/?num=1&len=16&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new')
            .then(res => res.text())
            .then(res => {
                navigator.clipboard.writeText(res);
            });
    }
    return (
        <div id="klausen">
            <div className="main-si">
            <div className="sp-1-eo">
                <div className="sp-1-io p-5">
                        <Text styles={{ root: { color: ColorClassNames.white, fontWeight: FontWeights.light, } }}>
                            <h2 className="klausen-title">Sign up for Huelet!</h2>
                        </Text>
                        <Text styles={{ root: { color: ColorClassNames.white, fontWeight: FontWeights.light } }}>
                            <p className="klausen-subtitle">We only need a username and password </p>
                        </Text>
                        <form id="form">
                            <input className={styles.input} id="username" type="text" name="username" placeholder="Username" />
                            <div className="spacer-sm"></div>
                            <div className="pwd-input flex">
                                <input className={styles.input} id="password" type="password" name="password" placeholder="Password" />
                                <div className="spacer-sm"></div>
                                <a href="#pwg-modal">
                                    <div className={`${styles.pwgTrigger} cursor`}>
                                        <img src="https://cdn.huelet.net/assets/icons/add.svg" alt="Open password generate modal" />
                                    </div>
                                </a>
                            </div>
                            <div className="spacer"></div>
                            <button className={styles.submit} id="submit">Sign up</button>
                            <div id="error-box"></div>
                        </form>
                    </div>
            </div>
        </div>
        <div className={styles.pwgModal} id="pwg-modal">
            <a href="#">
                <div className={styles.pwgModalClose}> 
                    <img src="https://cdn.huelet.net/assets/icons/close.svg" alt="Close password generate modal" />
                </div>
            </a>
            <div className={styles.pwgModalContent}>
                <div className="sp-1-eo">
                    <div className="sp-1-io p-5">
                        <Text styles={{ root: { color: ColorClassNames.white, fontWeight: FontWeights.light, } }}>
                            <h2>Generate a password</h2>
                        </Text>
                        <Text styles={{ root: { color: ColorClassNames.white, fontWeight: FontWeights.light } }}>
                            <p className="pwg-subtitle">Generate a password for your account</p>
                        </Text>
                        <input className={styles.input} id="pwg-password" type="password" name="password" placeholder="Generated Password" disabled={true} />
                        <div className="spacer-sm"></div>
                        <button className={styles.submit} id="pwg-submit" onClick={getRandomPassword}>Generate</button>
                        <div className="spacer.sm"></div>
                        <div className="sp-1-io">
                            <div className="p-5" id="pwg-response">
                                {pwgResponse}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
    )
};

export default AuthUp;