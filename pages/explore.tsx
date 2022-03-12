import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/ExplorePage.module.css";
import Header from "../components/header";

const Explore: NextPage = () => {
  const [timesClicked, setTimesClicked] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const addCount = () => {
    setTimesClicked(timesClicked + 1);
  };
  if (timesClicked >= 10) {
    console.log("You have clicked the button more than 10 times");
    setIsOpen(true);
  }
  const getDate = () => {
    let d = new Date(Date.now());
    return d.getHours() <= 12 ? "Morning" : "Afternoon";
  };

  return (
    <div id="klausen">
      <Header />
      <div className="d-2">
        <div
          className={`d-1`}
          onClick={() => {
            addCount();
          }}
        >
          <img
            src="https://cdn.huelet.net/assets/hlogo.jpg"
            alt="Huelet logo"
          />
          <div>
            {isOpen ? (
              <video controls>
                <source
                  src="https://videos.cdn.huelet.net/asset-025cbdd0-eab3-11eb-8743-35f9dd1b924b/You%20Just%20Got%20Coconut%20Mall%E2%80%99d.mp4?sp=r&st=2022-01-08T16:59:10Z&se=2028-11-01T23:59:10Z&sip=0.0.0.0-255.255.255.255&spr=https&sv=2020-08-04&sr=b&sig=M4%2BA1dZiYCrBEHMjBh051kPcjMRHSy3hOtNdmtG4200%3D"
                  type="video/mp4"
                />
              </video>
            ) : (
              <div className="hidden">
                you might get coconut malled. share this with all your friends
                to totally possibly coconut mall them.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.mainText}>
        Good {getDate()}!
        <br />
        <h2 className={styles.mainText}>
          We&apos;re working on this part. Come back later.
        </h2>
      </div>
    </div>
  );
};

export default Explore;
