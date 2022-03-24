import "../styles/globals.css";
import "../styles/adstyles.css";
import "../styles/VideoPlayer.css";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";

function HueletWebapp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default HueletWebapp;
