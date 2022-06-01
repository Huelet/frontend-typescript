import type { NextPage } from "next";
import { useState } from "react";
import { useCookies } from "react-cookie";
import styles from "../../../styles/Settings.module.css";
import { useToggle } from "@mantine/hooks";
import { Group, Modal, Select, Switch, Text } from "@mantine/core";
import { Header } from "../../../components/header";

const Themes: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");

  /* modals */
  const [suggestModal, toggleSuggestModal] = useState(false);
  /* settings */
  const [darkMode, toggleDarkMode] = useToggle(true, [true, false]);

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
              <h2 className={styles.mainText}>Theming &amp; Customization</h2>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.profile}>
              <div className={styles.profileOptionItem}>
                <Switch
                  label="Dark Mode"
                  size="md"
                  color="violet"
                  checked={darkMode}
                  onChange={(event) => {
                    toggleDarkMode(event.currentTarget.checked);
                  }}
                />
              </div>
              <div className={styles.profileOptionItem}>
                <Select
                  itemComponent={({ value, label, description, link }) => (
                    <div>
                      <Group noWrap>
                        <Text size="sm">{label}</Text>
                        <br />
                        <Text size="sm" color="dimmed">
                          {description}
                        </Text>
                        <a href={link}>GitHub</a>
                      </Group>
                    </div>
                  )}
                  data={[
                    {
                      value: "Firefly",
                      label: "Firefly",
                      description: "Default theme",
                      link: "https://github.com/huelet/firefly",
                    },
                    {
                      value: "Casper",
                      label: "Casper",
                      description: "Inspired by TryGhost/Casper",
                      link: "https://github.com/TryGhost/Casper",
                    },
                  ]}
                />
                <button
                  className="button-primary"
                  onClick={() => toggleSuggestModal(true)}
                >
                  Add a theme
                </button>
                <Modal
                  opened={suggestModal}
                  title="Suggest your theme"
                  onClose={() => toggleSuggestModal(false)}
                >
                  <div className="modal-content">
                    <Text size="sm">
                      If you have a theme that you would like to suggest, please
                      create an issue{" "}
                      <a href="https://github.com/huelet/frontend">on GitHub</a>{" "}
                      with a link to your theme.
                      <br />
                      <br />
                      You will need to upload the theme to a service yourself,
                      then link it in your GitHub issue. We suggest{" "}
                      <a href="https://ttm.sh">ttm.sh</a>,{" "}
                      <a href="https://file.coffee">file.coffee</a>, or
                      OneDrive.
                      <br />
                      <br />
                      <a href="https://docs.huelet.net/developers/theming">
                        <ul>
                          <li>Theming Guide</li>
                        </ul>
                      </a>
                    </Text>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;
