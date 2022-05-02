import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { ConsentGate } from "@confirmic/react";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import { Modal } from "../components/modal";
import { Secure, Eye, Close } from "@fdn-ui/icons-react";
import Link from "next/link";
import { useCookies } from "react-cookie";

const Home: NextPage = () => {
  const [interactivePrivacyDemoOpen, setInteractivePrivacyDemoOpen] = useState(false);
  const [cookie, setCookie] = useCookies(["_hltoken"]);
  const checkCookie = async () => {
    const token = cookie._hltoken;
    if (token) {
      const resp = await fetch("https://api.huelet.net/auth/token", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      console.log(data);
      if (resp.status === 200) {
        console.log(data);
        location.assign("/explore");
        return true;
      } else {
        return false;
      }
    }
  };
  checkCookie();
  return (
    <div id="klausen">
      <Footer />
    </div>
  );
};

export default Home;
