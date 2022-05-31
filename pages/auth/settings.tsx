import type { NextPage } from "next";
import styles from "../../styles/Settings.module.css";
import { SetStateAction, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../../components/header";
import { Modal } from "@mantine/core";
import { useSound } from "use-sound";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Avatar, BulletList, Upload, Location } from "@fdn-ui/icons-react";
import Loader from "../../components/loader";

const AuthSettings: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns]: any = useState([]);
  const [location, setLocation] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [updatedPfp, setUpdatedPfp]: any | any = useState(null);
  const [updatedPronouns, setUpdatedPronouns] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [privateAcct, setPrivateAcct] = useState(false);
  /* Modals */
  const [pfpModal, togglePfpModal] = useState(false);
  const [pronounsModal, togglePronounsModal] = useState(false);
  const [bioModal, toggleBioModal] = useState(false);
  const [locationModal, toggleLocationModal] = useState(false);
  /* loaders */
  const [pfpUploading, setPfpUploading] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const [pronounsLoading, setPronounsLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
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
    setPronouns(pronounDataJSON.pronouns || []);
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

    setLoading(false);
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
    setUpdatedPronouns(event.target.value);
  };
  const handleLocationChange = (event: {
    target: { value: SetStateAction<any> };
  }) => {
    setUpdatedLocation(event.target.value);
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
  const submitNewPronouns = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetch("https://api.huelet.net/auth/pronouns", {
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
    fetch("https://api.huelet.net/auth/location", {
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
  if (loading === true) {
    checkCookie();
    getData();
  } else {
    null;
  }
  return (
    <SkeletonTheme baseColor="#4E4E4E" highlightColor="#686868">
      <div id="klausen">
        <Header username={username} />
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
                      {loading ? (
                        <Skeleton width={128} height={128} circle={true} />
                      ) : (
                        <img
                          src={pfp}
                          alt="profile image"
                          width={128}
                          height={128}
                          className={`${styles.profileImageInner}`}
                        />
                      )}
                      {loading ? (
                        <Skeleton width={128} height={64} />
                      ) : (
                        <>
                          <div
                            className={`${styles.profileImageUploadIcon}`}
                            onClick={() => {
                              togglePfpModal(true);
                              playClickSound();
                            }}
                          >
                            <div className={`${styles.icon}`}>
                              <Upload fill={"white"} />
                            </div>
                          </div>
                          <Modal
                            opened={pfpModal}
                            onClose={() => togglePfpModal(false)}
                          >
                            <div className={`${styles.profileImageUpload}`}>
                              <img
                                src={pfp}
                                alt="profile image"
                                width={128}
                                height={128}
                                className={`${styles.profileImageInner}`}
                              />
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
                                  <Upload fill={"white"} />
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
                                  onClick={() => {
                                    setPfpUploading(true);
                                    playSubmitSound();
                                    submitNewPfp;
                                  }}
                                >
                                  <div className={pfpUploading ? "hidden" : ""}>
                                    Upload
                                  </div>
                                  <div className={pfpUploading ? "" : "hidden"}>
                                    <Loader />
                                  </div>
                                </button>
                              </form>
                            </div>
                          </Modal>
                        </>
                      )}
                    </div>
                    <div className={`${styles.profileInfo} ${styles.column}`}>
                      <h2 className={`${styles.usernameText} ${styles.column}`}>
                        {loading ? <Skeleton width={256} /> : username}
                      </h2>
                      <div className={`${styles.userDetails} ${styles.column}`}>
                        <div className={`${styles.userDetailsPronouns}`}>
                          {loading ? (
                            <Skeleton width={256} />
                          ) : (
                            <span>
                              <span
                                onClick={() => {
                                  togglePronounsModal(true);
                                  playClickSound();
                                }}
                              >
                                <Avatar fill={"black"} />
                              </span>
                              <Modal
                                opened={pronounsModal}
                                onClose={() => togglePronounsModal(false)}
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
                                      onClick={() => {
                                        setPronounsLoading(true);
                                        playSubmitSound();
                                        submitNewPronouns;
                                      }}
                                    >
                                      <div
                                        className={
                                          pronounsLoading ? "hidden" : ""
                                        }
                                      >
                                        Save
                                      </div>
                                      <div
                                        className={
                                          pronounsLoading ? "" : "hidden"
                                        }
                                      >
                                        <Loader />
                                      </div>
                                    </button>
                                  </form>
                                </div>
                              </Modal>
                              <p>{pronouns.join("/")}</p>
                            </span>
                          )}
                        </div>
                        <div className={`${styles.userDetailsBio}`}>
                          {loading ? (
                            <Skeleton width={256} />
                          ) : (
                            <span>
                              <span
                                onClick={() => {
                                  toggleBioModal(true);
                                  playClickSound();
                                }}
                              >
                                <BulletList fill={"black"} />
                              </span>
                              <Modal
                                opened={bioModal}
                                onClose={() => toggleBioModal(false)}
                              >
                                <div className={`${styles.editBio}`}>
                                  <form
                                    id="editBioForm"
                                    onSubmit={submitNewBio}
                                  >
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
                                      onClick={() => {
                                        setBioLoading(true);
                                        playSubmitSound();
                                        submitNewBio;
                                      }}
                                    >
                                      <div
                                        className={bioLoading ? "hidden" : ""}
                                      >
                                        Save
                                      </div>
                                      <div
                                        className={bioLoading ? "" : "hidden"}
                                      >
                                        <Loader />
                                      </div>
                                    </button>
                                  </form>
                                </div>
                              </Modal>
                              <p>{bio}</p>
                            </span>
                          )}
                        </div>
                        <div className={`${styles.userDetailsLocation}`}>
                          {loading ? (
                            <Skeleton width={256} />
                          ) : (
                            <span>
                              <span
                                onClick={() => {
                                  toggleLocationModal(true);
                                  playClickSound();
                                }}
                              >
                                <Location fill={"black"} />
                              </span>
                              <Modal
                                opened={locationModal}
                                onClose={() => toggleLocationModal(false)}
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
                                      className={`${styles.editLocationButton}`}
                                      onClick={() => {
                                        setLocationLoading(true);
                                        playSubmitSound();
                                        submitNewLocation;
                                      }}
                                    >
                                      <div
                                        className={
                                          locationLoading ? "hidden" : ""
                                        }
                                      >
                                        Save
                                      </div>
                                      <div
                                        className={
                                          locationLoading ? "" : "hidden"
                                        }
                                      >
                                        <Loader />
                                      </div>
                                    </button>
                                  </form>
                                </div>
                              </Modal>
                              <p>{location}</p>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default AuthSettings;
