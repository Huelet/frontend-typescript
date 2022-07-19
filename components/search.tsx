import { useState } from "react";
import styles from "../styles/components/Search.module.css";
import { Modal } from "@mantine/core";
import { Search as SearchIcon } from "@fdn-ui/icons-react";

export interface SearchProps {
  className?: string;
  chonky?: boolean;
  placeholder?: string;
  defaultValue?: string;
  quickSearch?: boolean;
}

export const Search = ({
  className,
  chonky,
  placeholder,
  defaultValue,
  quickSearch,
}: SearchProps) => {
  const [searchModal, toggleSearchModal] = useState(false);
  return (
    <div className={className ? className : ""}>
      <div className="searchBox">
        <form action="/s" method="get">
          <div className="searchBoxInput">
            <input
              className={styles.searchBar}
              type="text"
              name="q"
              placeholder={placeholder ? placeholder : "Search"}
              defaultValue={defaultValue ? defaultValue : ""}
              autoComplete="off"
              autoCorrect="off"
            />
            <button className={`${styles.searchbutton} cursor`} type="submit">
              <div className={`${styles.searchbutton}`}>
                <SearchIcon fill={"white"} />
              </div>
            </button>
          </div>
        </form>
        <button className={`${styles.searchbuttonMobile} cursor`}>
          <div
            className={`${styles.searchbuttonMobile}`}
            onClick={() => toggleSearchModal(true)}
          >
            <SearchIcon fill={"white"} />
          </div>
        </button>
        <Modal
          opened={searchModal}
          onClose={() => toggleSearchModal(false)}
          title="Search"
        >
          <div className={styles.searchModal}>
            <form action="/s" method="get">
              <input
                className={styles.searchBarMobile}
                type="text"
                name="query"
                placeholder={placeholder ? placeholder : "Search"}
                defaultValue={defaultValue ? defaultValue : ""}
              />
              <button
                className={`${styles.searchbuttonMobile} cursor`}
                type="submit"
              >
                <div className={`${styles.searchbuttonMobile}`}>
                  <SearchIcon fill={"white"} />
                </div>
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};
