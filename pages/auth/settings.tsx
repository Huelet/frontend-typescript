import type { NextPage } from "next";
import styles from "../../styles/Settings.module.css";
import { SetStateAction, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import Header from "../../components/header";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AuthSettings: NextPage = () => {
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState([]);
  const [location, setLocation] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [updatedPfp, setUpdatedPfp]: any | any = useState(null);
  const [updatedPronouns, setUpdatedPronouns] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [privateAcct, setPrivateAcct] = useState(false);
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
  checkCookie();
  const getData = async () => {
    const profileImageData = await fetch(
      `https://api.huelet.net/auth/pfp?username=${username}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const profileImage = await profileImageData.json();
    setPfp(profileImage.pfp);
    const bioData = await fetch(
      `https://api.huelet.net/auth/bio?username=${username}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const bioDataJSON = await bioData.json();
    setBio(bioDataJSON.bio);
    const pronounData = await fetch(
      `https://api.huelet.net/auth/pronouns?username=${username}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const pronounDataJSON = await pronounData.json();
    setPronouns(pronounDataJSON.pronouns);
    const locationData = await fetch(
      `https://api.huelet.net/auth/location?username=${username}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const locationDataJSON = await locationData.json();
    setLocation(locationDataJSON.location);
  };
  const handleBioChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUpdatedBio(event.target.value);
  };
  const handlePfpChange = (event: any) => {
    setUpdatedPfp(event.target.files[0]);
  };
  const handlePronounsChange = (event: {
    target: { value: SetStateAction<any> };
  }) => {
    setPronouns(event.target.value);
  };
  const handleLocationChange = (event: {
    target: { value: SetStateAction<any> };
  }) => {
    setUpdatedLocation(event.target.value);
  };
  const submitNewBio = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const resp = await fetch("https://api.huelet.net/auth/bio", {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer: ${cookie._hltoken}`,
      },
      body: JSON.stringify({
        bio: updatedBio,
        username: username,
      }),
    });
    const data = await resp.json();
    window.location.reload();
  };
  const submitNewPfp = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", updatedPfp);
    formData.append("username", username);
    const resp = await fetch("https://api.huelet.net/auth/pfp", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        authorization: `Bearer: ${cookie._hltoken}`,
      },
      body: formData,
    });
    const respJSON = await resp.json();
    if (resp.status === 200) {
      const resp2 = await fetch("https://api.huelet.net/auth/pfp", {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer: ${cookie._hltoken}`,
        },
        body: JSON.stringify({
          username: username,
          url: respJSON.pfp,
        }),
      });
      window.location.reload();
    }
  };
  const submitNewPronouns = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const resp = await fetch("https://api.huelet.net/auth/pronouns", {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer: ${cookie._hltoken}`,
      },
      body: JSON.stringify({
        pronouns: updatedPronouns.split("/"),
        username: username,
      }),
    });
    window.location.reload();
  };
  const submitNewLocation = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const resp = await fetch("https://api.huelet.net/auth/location", {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer: ${cookie._hltoken}`,
      },
      body: JSON.stringify({
        location: updatedLocation,
        username: username,
      }),
    });
    window.location.reload();
  };
  getData();
  return (
    <div id="klausen">
      <Header />
      <div className="main-si cursor">
        <div className="sp-1-eo">
          <div className="sp-1-io p-5">
            <div className="mainText">
              <h2 className={`${styles.mainText}`}>Settings</h2>
            </div>
            <div className={styles.divider}></div>
            <div className={`${styles.profile}`}>
              <div className={`${styles.profileInner}`}>
                <div className={`flex`}>
                  <div className={`${styles.profileImage}`}>
                    <img
                      src={pfp}
                      alt="profile image"
                      width={128}
                      height={128}
                      className={`${styles.profileImageInner}`}
                    />
                    <Popup
                      trigger={
                        <div className={`${styles.profileImageUploadIcon}`}>
                          <img
                            src="https://cdn.huelet.net/assets/icons/upload.svg"
                            alt="upload"
                            className={`${styles.icon}`}
                          />
                          Upload
                        </div>
                      }
                    >
                      <div className={`${styles.profileImageUpload}`}>
                        <form>
                          <input
                            type="file"
                            name="file"
                            id="file"
                            accept="image/*"
                            onChange={handlePfpChange}
                            className={`${styles.profileImageUploadInput}`}
                          />
                          <label
                            htmlFor="file"
                            className={`${styles.profileImageUploadLabel}`}
                          >
                            <img
                              src="https://cdn.huelet.net/assets/icons/upload.svg"
                              alt="upload"
                            />
                            Choose an image
                          </label>
                          <input
                            type="text"
                            name="username"
                            defaultValue={username}
                            hidden
                          />
                          <button
                            type="submit"
                            className={`${styles.profileImageUploadButton}`}
                            onClick={submitNewPfp}
                          >
                            Upload
                          </button>
                        </form>
                      </div>
                    </Popup>
                  </div>
                  <div className={`${styles.profileInfo} ${styles.column}`}>
                    <h2 className={`${styles.usernameText} ${styles.column}`}>
                      {username}
                    </h2>
                    <div className={`${styles.userDetails} ${styles.column}`}>
                      <p className={`${styles.userDetailsPronouns}`}>
                        <Popup
                          trigger={
                            <img
                              src="https://cdn.huelet.net/assets/icons/avatar.svg"
                              alt="pronouns icon"
                              width={16}
                              height={16}
                            />
                          }
                        >
                          <div className={`${styles.pronouns}`}>
                            <form>
                              <input
                                type="text"
                                name="pronouns"
                                placeholder="Pronouns"
                                onChange={handlePronounsChange}
                                className={`${styles.editPronounsInput}`}
                              />
                              <button
                                type="submit"
                                className={`${styles.editPronounsButton}`}
                                onClick={submitNewPronouns}
                              >
                                Save
                              </button>
                            </form>
                          </div>
                        </Popup>
                        {() => {
                          pronouns.join("/");
                        }}
                      </p>
                      <p className={`${styles.userDetailsBio}`}>
                        <Popup
                          trigger={
                            <img
                              src="https://cdn.huelet.net/assets/icons/bullet_list.svg"
                              alt="bio icon"
                              width={16}
                              height={16}
                            />
                          }
                        >
                          <div className={`${styles.editBio}`}>
                            <form id="editBioForm" onSubmit={submitNewBio}>
                              <input
                                type="text"
                                name="bio"
                                placeholder="Bio"
                                onChange={handleBioChange}
                                className={`${styles.editBioInput}`}
                              />
                              <button
                                type="submit"
                                className={`${styles.editBioButton}`}
                                onClick={submitNewBio}
                              >
                                Save
                              </button>
                            </form>
                          </div>
                        </Popup>
                        {bio}
                      </p>
                      <p className={`${styles.userDetailsLocation}`}>
                        <Popup
                          trigger={
                            <img
                              src="https://cdn.huelet.net/assets/icons/location.svg"
                              alt="location icon"
                              width={16}
                              height={16}
                            ></img>
                          }
                        >
                          <div className={`${styles.editLocation}`}>
                            <form
                              id="editLocationForm"
                              onSubmit={submitNewLocation}
                            >
                              <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                onChange={handleLocationChange}
                                className={`${styles.editLocationInput}`}
                              />
                              <button
                                type="submit"
                                className={`${styles.editLocationButton}`}
                              >
                                Save
                              </button>
                            </form>
                          </div>
                        </Popup>
                        {location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSettings;
