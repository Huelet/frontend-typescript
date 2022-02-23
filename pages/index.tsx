import type { NextPage } from 'next';
import { Lock, Shield } from "react-feather";
import { FontSizes, FontWeights, ColorClassNames, Text } from '@fluentui/react';
import Footer from '../components/footer';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div id="klausen">
      <Text styles={{ root: { fontWeight: FontWeights.light, fontSize: FontSizes.size42, color: ColorClassNames.white, textAlign: "center" } }}>
        <h2>Hi, we&apos;re Huelet</h2>
      </Text>
      <Text styles={{ root: { fontWeight: FontWeights.light, fontSize: FontSizes.size32, color: ColorClassNames.white, textAlign: "center" } }}>
        <h1 className="ms-textAlignCenter ms-fontWeight-light ms-fontSize-68 ms-fontColor-white">A smart video platform for creators, viewers, and advertisers.</h1>
      </Text>
        <div className="watch-now-clears">
            <div className="watch-now-link">
                <Link href="/auth/up" passHref={true}> 
                    <button className="main-btn">Watch now</button>
                </Link>
            </div>
        </div>
        <div id="desktop">
            <div className="main-si">
                <div className="sp-1-io">
                    <div className="sp-1-io-inner">
                        <Lock className="icon-lg privacy-icon" />
                        <div className="spacer"></div>
                        <Text styles={{ root: { color: ColorClassNames.white, } }}>
                            <h2>Privacy</h2>
                        </Text>
                    </div>
                    <Text styles={{ root: { color: ColorClassNames.white } }}>
                        <p>Click on me to learn more!</p>
                    </Text>
                </div>
                <div className="spacer"></div>
                <div className="sp-1-io">
                    <div className="sp-1-io-inner">
                        <Shield className="icon-lg mod-icon" />
                        <div className="spacer"></div>
                        <Text styles={{ root: { color: ColorClassNames.white, } }}>
                            <h2 className="ms-textAlignCenter ms-fontSize-42">Moderation</h2>
                        </Text>
                    </div>
                    <Text styles={{ root: { color: ColorClassNames.white } }}>
                        <p>Click on me to learn more!</p>
                    </Text>
                </div>
            </div>
        </div>
            <Footer />
    </div>
  )
}

export default Home
