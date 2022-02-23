import '../styles/globals.css'
import type { AppProps } from 'next/app'

function HueletWebapp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default HueletWebapp;