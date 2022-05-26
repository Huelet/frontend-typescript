import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "../components/header";
import { useCookies } from "react-cookie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Search: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const [username, setUsername] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { query } = useRouter();
  const getUserData = () => {
    fetch(`https://api.huelet.net/auth/token`, {
      headers: {
        Authorization: `Bearer ${cookie._hltoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      });
  };
  const getSearchData = () => {
    fetch(`https://api.huelet.net/search?q=${query.q}`, {
      headers: {
        Authorization: `Bearer ${cookie._hltoken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
        setLoading(false);
      });
  };
  if (loading === true) {
    getUserData();
    getSearchData();
  } else {
    null;
  }
  return (
    <div id="klausen">
      <SkeletonTheme baseColor="#4E4E4E" highlightColor="#686868">
        <Header username={username} />
        <div className="spacer-sm"></div>
        <article>{searchData}</article>
        <aside>
          <div className="adFrame--rightAsideColumn">hi!! i&apos;m an ad!</div>
        </aside>
      </SkeletonTheme>
    </div>
  );
};

export default Search;
