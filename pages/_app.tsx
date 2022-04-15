import "../styles/globals.css";
import "../styles/adstyles.css";
import "../styles/VideoPlayer.css";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { ConsentGate, ConfirmicProvider } from "@confirmic/react";

function HueletWebapp({ Component, pageProps }: AppProps) {
  return (
    <ConfirmicProvider projectId="prj:7466fc15-caeb-4765-a170-24e302583964" debug={true}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ConfirmicProvider>
  );
}

export default HueletWebapp;
