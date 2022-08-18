/** @jsxImportSource @emotion/react */
import * as React from "react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/ExplorePage.module.css";
import { useCookies } from "react-cookie";
import { Header } from "../components/header";
import { VideoCard } from "../components/video-card";
import Image from "next/image";
import { css, jsx } from "@emotion/react";

const Explore: NextPage = () => {
	const [cookie, setCookie] = useCookies(["_hltoken"]);
	const [username, setUsername] = useState("");
	const [todayVideos, setTodayVideos] = useState([]);

	useEffect(() => {
		fetch("https://api.huelet.net/auth/token", {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${cookie._hltoken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setUsername(data.username);
			});
	}, [cookie]);
	const getDate = () => {
		const d = new Date(Date.now());
		return d.getHours() <= 12 ? "Morning" : "Afternoon";
	};
	return (
		<div id="klausen">
			<Head>
				<title>Explore - Huelet - The video platform for humans</title>
			</Head>
			<Header username={username} />
			<div className={styles.exploreContainer}>
				<div className={`${styles.exploreWelcome}`}>
					<Image
						loader={() => {
							return "https://cdn.huelet.net/assets/logo.png";
						}}
						src="https://cdn.huelet.net/assets/logo.png"
						alt="Huelet logo"
						width={64}
						height={64}
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAIAAABEtEjdAAAgAElEQVR4Ae2de5PctrmndZlhf4Ak0kx3o7VVqd3as7X7x1adT7D/7IfY2rWOL7Ls2JFlaeYbTncf+8SKb8rNuTmx48SJL7EVjzO2e4uNEYfqbpLASxAEwEc1peKwAV5+ePH0b16A4CWlZvygAAqgAAokpsClxO6H20EBFEABFFBqBtz5wwUFUAAFElQAuCfYqNgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqHgWFEABFADuwB0FUAAFElQAuCfYqAPxLCcn8/l8MZ8v9L/TR2dOfvTR9JFPTuYDEZPbTE8B4A7cw1VA43uxWOyk9srLv52nXizyL5X0cMAdpaQAcA8XbSnFWeO9aI4vl8syTL3QW36S8qWePjqD+I2tTAGfCgB34N6PAicneT6l4KMcsYHVLO4I3PsEGefaVgC494O27ZZIfo9OjhfsC4zJHV5Occsa9+Txkw/1QG4QuAP3rhRI1Zu3/x7QuF8ulyTuA+FgkpcB3LtCW5Lh0nhT83mCmZb2NK85QuHrFwtGaOmMLhUA7i7VbGRfkgXm80UxEFpDMT5qVKAAPY4+yZ7i+aaAO3AXKlAMhzYyiwICBYrUDTl6z0xM5nTAXYi2ZCLA6kZOTuaYdAGpW1bRoCdvYxWrFAbuwL1ZgZOTueZLS0hRvaUCUB5kmysA3JvRZq5mYiWL0dGWSKK6cwWgfGJ9rYvbAe7AfVMBmO6cxd0dEMp3gcU0jgncN9GWRrsK7oLcS3cI9nBkTXmm2QgiP9UqwB24z7RV9wCg7k5xcjJ3+NPddXo4sn4ONlVgcV/mCgD3QcNdT33xQJyWp2gEt3nEm5RsPF3L2/FQHSNv0tBplwHuQ4R7sFn1KqqG1gmrrtMDtW1PcfrobLlchiYg1+NBAeA+LLjrJ49sAdFR+W1Eeoj4Tk+xfUcdSWd7WG3kO713Dh6aAsB9KHDX3dsWCm7Lb7AvtM7QxfVs3LJbPW2PpmOAR167aOgAjwncE4d773NgynQLsAN4vqSyGrZodlj+9NEZ82o8N73/0wH3ZOHe4xyYMsL8x3QsZyyr5BDc5odiXk0soSK7TuCeINx7SayXUSWLxSHXKtQzR7OrkiA+1cAD7knB3T/WCyql2kM831eh58nJ3BW+TY4D4j03tIfTAfdE4O4Z6wWDPMToYE9RiGxCZydlQHxKwQbco4e7z9x6gZuU+kD491LI7oTgjQdhanz4IWFyhcA9Yrh7w3oBF5OQokx3ChQN0Qjo9gVw8d21o58jA/co4a4nOLbvwPVHKFDiJxY5i7kCRdPUt2D7T5k0ad4ooZUE7vHB/fTRWftOW3OEAhyhBSvXs62Abqya1nTy0emjMx592hY/8D3APSa4d73OlyZF4CHL5W0rUHwfO0F51UFOH51tn5o9wSoA3OOAe6fp9QINwYYpF2aoQNGUVYBuuZ+xVsOGCKEYcI8A7t3lYbDqIXTCLq5Bt2xLlFdVJxHfRZM5PyZwDxru3a32Bdad96UAD9g14gO8ZS6pUAC4Bwr37vIwYL2I/oFsdId4pkuGHELAPUS4d5SHAeshd8Wur61TxHd98RxfoABwDwvuHRl2sC7oG0lW6QjxDLQGGC3APSC4d2HYwXqAva73S+oO8UyH771xiwsA7kHA3blh172XnlYEOhvbCnSEeF7Zui11L3uAe/9wd2vYseq9dKR4T9oF4nncKYR4AO59wt3tEjFgPYQeFek1OEc8E2l6jwTg3hvcl8tl1UMigv1kYHrvSwlcQBeIT0CWSG8BuPcDd4epGAx7pH0v2Mt2i3gsfF8NDdx9w93hK5PAel/dZgjndfueP7Lw/mMGuHuFu1vD7j9cOOOgFHBu4QelXu83C9z9wd0V2THsvXebQV2AQ8STovEZOcDdB9zdpmJ8xgfnQgGtgMMsDSkaP0EF3DuHO4bdTyhzlq4VcGvhu75ajg/cu4W7E7KTh6GjhqOAKwvPovBdtylw7wrurlYUYAJ7132A49sq4NDCs1aBrfjm5YF7J3DHsJuHICUjVcChhY9UgcAvG7i7h7srsgceOlweCriy8AyxdhFLwN0x3NuTnQx7F4HOMbtTwImFh+/OGwi4O4O7k1XAyLA7D3EO6EEBJxaeIVa3LQXc3cB9sVgIVvvaqALZ3QY3R/OsgBMLv1gsPF92qqcD7g7g3n59R1IxqXawod2XKws/NN26uF/g3hbuTpLsXTQtx0SBvhRob+FJwbdvO+DeCu4tyY5hbx/BHCFMBeB77+0C3OVwb0/23pufC0CB7hRon6LBv7dpHeAuhDtkbxN21B2OAi0tPHwXhwpwl8AdsosDjooDVKA935lIJggb4G4N9zZkJ8kuiFGqJKBAS76vVqv5nCmSdrAC7nZ6tSR7Ar2UW0ABmQLtU/BMgbdSHrhbwB2yW8UWhVFgW4GWFh6+b0tatQe4m8IdslfFEPtRwEoB+G4ll7gwcDeCO2QXRxgVUWBbAfi+rYnzPcC9Ge6Q3XnYcUAUgO9dxwBwb4C7mOxMjOk6djl+7Aq05DvzZ+oDALjXwb0N2et151MUQAGlZvC9uzAA7pVwh+zdhR1HRoFCAfheSOF2A7jvhjtkdxtnHA0FahQ4OZnP5/ON1xuY/8rzqzu1Be474A7Zd8YKO1GgUwXEfGf9mZ3tAtw34Q7ZdwYKO1HAgwLiFA18324d4P4E3CH7doiwBwV8KgDfXakN3C/gLn5bHik/V+HIcVCgzRQa/Hs5foD7OdzFb7iG7OV4YhsFnCiAf28vI3DP4T6fL8yH5sslIXv7EOQIKLBTAfi+UxbzncA9h7ss1Q7ZzeOMkiggUEDM9+VyKThdYlWAO2S/GHVILLi5nQQUEPOdxQmGDnc8ewL9n1tIWwEZ3xlcHTTcIXvaUODuklEAvguacrhwh+yCcKEKCvSlAHy3VX6gcJdNj2EE1Ta8KI8CrhSQwX21Wg12cHWgcMe2u+pyHAcFvCkg5vswB1eHCHfI7q03ciIUcKuAjO/DHFwdHNwhu9vOxtFQwLMC8N1Q8GHBXbbGAKl2w2CiGAr4UQC+m+g8ILjLAgKym4QRZVDAswKy7jyo5PuA4C5IyEB2zz2W06GAoQIyuA8q+T4UuEN2wz5DMRSIRQH4Xt9Sg4A7qfb6IOBTFIhUARnfBzLzfRBwx7ZH2nW5bBRoVEDG9yEk39OHO2Rv7B4UQIGoFRDwfQjJ98ThDtmj7rRcPAqYKCCA+2q1Sp7vKcNdsIAM02NM+hJlUCA0BWR8XywWod2Iw+tJGe7YdoeBwqFQIHAFBHxP27wnC3fIHnhX5PJQwLkC8L0saZpwXy6X5ddYm2yTkCmHBdsoEKkCAr6nmpxJE+7Y9kh7JpeNAi0VEMA91eRMgnCH7C27B9VRIGoF4LtuvtTgLngYlYRM1D2Zi0eBbQUEfE/vsdXU4G5r2yH7dsdgDwrEroAA7qvVKjEaJAV3W7Kn15yx90muHwVcKSDge2LJ93TgziNLrnoFx0GBNBQQ8D2lmTPpwN3Wtif2J1gavZG7QAGHCgjgnpJ5TwTutmQnIeOwC3EoFAhWgSHzPQW4C9oP2x5sb+TCUMCtAoPlQwpwt7XtkN1t5+FoKBCyAgK4p5GciR7ujKOG3K+4NhQIQQEB3xMYWY0e7tj2EDoP14ACgStgy/cEzHvccLddIIyETOA9kMtDgY4UsIV7Am/ziBvu2PaOeoJSs+lUdXdw/0f2djveTuRfw+0zxnWztnyP3bxHDHfIvt3ZXO2ZTpX+eTp7I4Gf4nZc6VNznJR0q296n6rWCG710aD4HivcbRuJhIxVH1Bqdv1QHV/55/GlVQo/e48OJ57+EJlM1O3RwxREa2z6vS/HvlS1jd6q8rbcWK1W83msr+KLFe7Y9qrwdbX/qey1dAh15exw7A/uL45+no50NYi/cubtK9NVVCs1s+V7vMmZKOFuO/0R2y7oGzez19MhFHCvYbT4o2HAPV7zHiXcse0CWNtWAe62iunyk4nCucuk81ZrIOY9Prjbvo4D2y7rM8Bdphtwl+nmuZYt32N8pik+uGPb/XQD4C7TGbjLdPNcyxbuMWbeI4M7tt1bHwDuMqmBu0w3/7Vs+R6deY8M7la2nYRMmw4D3GXqAXeZbv5r2cI9OvMeE9yx7T47AHCXqQ3cZbr1UsuW73GZ95jgjm332QGAu0xt4C7TrZdatnCPy7xHA3dsu+foB+4ywYG7TLe+atnyPSLzHg3cse2eox+4ywQH7jLd+qplC/eIzHsccMe2+w994C7THLjLdOuxli3fY1ltJg64Y9v9hz5wl2kO3GW69VjLFu6xmPcI4M5KMr3EPXCXyQ7cZbr1W8uW71GY9wjgjm3vJe6Bu0x24C7Trd9atnCPwryHDndb0XlwyVUnAe4yJYG7TLfea6WHmtDhjm3vK+iBu0x54C7TrfdatnAP37wD91nvURXmBQB3WbsAd5luIdSy4jtwb4VOK9u+Wq3IyTjsIcBdJiZwl+kWQi0ruK9Wq8AfaArauVvBHbK77R4t4X579HD98+7tkZOfh/eyP8vfDBXRm5iufH0re8uRaI3KP3w1+1MrVWN7h2pjH7Hie+DmPVy4p/Tg0nSav8BT/98YXoEUaAn3Z7Of3pjNZsrNz42Zupt90ApDsbxD9epX1w+VK93qj3NDzV7J/tBK1WHDPfA38IUL95Rs+3Sq1mTX/7dKVXlDf0u4P5M9cHmpU3U3+2MrDMUD92sHnt7lrXK4v99K1eTgbvsG7ZDNe6Bwt/rjKPBs+3SqJjmbPriVvT3JO0MciAfusi+ntjn3q18Bd5nyrmpZwQe4W3vVlGy7UrNnsgfaH708+vV4omYx8B24y2AB3GW6hVPLCu6r1SpYvgfq3FOFe474q6cvjB6Og7fwwF2GG+Au0y2oWlZ8B+4W5t1qKDWKSTKFcy/ymz8e/a7Iwoc50ArcZbgB7jLdgqplBfdgh1VDdO6J2fZyWqaA+3rjuxdHP8+z8Plwq8WXn59uANxlOgN3mW6h1bLie5jmPTi4W2ka+FBqEa/bzr2g/L3sL89mD/R0mqAsPHAvms9qA7hbyRVsYSsQAXcjc5qeba927qsC8c9nbx+OtYX3Nw2uvl8B93p9qj4F7lXKRLffiu8BPq0anHMfJtxzyl99dCt763GWpn/EA3cZjIC7TLcAa1nBPUDzHhbcrd7LEcVQqg7ZmrRMYd71xsujXx+EYeGBuww3wF2mW4C1gLtRssWw5ZK07SZpmScQf/mbW9lbh+cDrb1ZeOBuGLQbxYD7hiBR/2rF9+VyGdTNhuXcgXtB+Vezj57pdaAVuMs6KnCX6RZmLSu4h5aZCQjuqeZkrJ37pYuB1tujh7mF7+OJVuAuww1wl+kWbC0rvgeVKw4I7qna9jZwP760Otr/7NnszfWiNF7XlQTuMtwAd5luwdaygntQ5h24uxwzqApQ8wHVIi2zsfHC6GE+C369dHDVWdzuB+4yPYG7TLdgawH3tohMOCfT0rlfUP7q6a3s7cerB7cVvLEvAfdGiXYWAO47ZYl6pxXfw8nMhOLcE87JOIP7OhevH2f10FWAu0xk4C7TLeRaVnAPZ84McO/cAruF+/Ojd/ysUgDcZbgB7jLdQq5lBfdw0u5BwD3tnIxjuGfA/WI20UXOqjTFaMfOiN6hyss68vcdBPdjznfg/kTjpZ2TcQv3W6M87e4h+nHuMpFx7jLdAq9lDvfVahXIOjNBOHfgvsNsVlhR4G6u1UVJnHuFF+YdqoZfKlZwD8S89w93K9XCGYk2jAldrP1UyIJTt/WcyIq+anVV9YVx7vX6VH2Kc69SJvb95qQC7ueZmfTeu7QdxE7h/i5pmeKrznQD517hBnDu2721ao853AN5N1P/zj35nIzjnPt6qntV/Dncj3OXiYlzl+kWfi0ruIdg3mOCe6Q5GcdwZ0C1YjSizsXj3HHuFQqYf6kA9yemwTQKl/wkSK2Aw7TM80yFBO6tOVV0TNIyhRQmG+Z8x7nPhpCTcevcn8veIudeZ9J3oh/nXvF9ANxNmF6UMYd7CBMie07LmMM93pyMW7iLp0JOp/kfVfr/IlhrNsi514hT8xE59xpxYv/ICu69m3fgbpdHkkVn72mZ6TRfLrj803gjwL1Rop0FgPtOWZLZac73QcN9CJMgdUw7hLt4nvtkov7X/7zxXPbmLH/3R/MzrsBdxiPgLtMtllrmcF+tVv3mG/p07uY5md5lahl5TuEunOc+nqjjvS+PL63uZh/qVzvV5+6Bu6zRgbtMt1hqWcG933UI4oB7v1+A7cPOIdz1ku6CSxqP1fHeF4+HIr/7t+w/6i08cBeIrNQMuMt0i6WWFdz7zcwA98hy7rdHcud+tP/ZY7jnCyse7X/6TPZgVvGCVuAuww1wl+kWUS1zvg8U7gOZ4a5D1qlzF06FHE/U0f7nZbjr7fMF4tfDreUOBtzLaphvA3dzrSItaQ73fvPJvTn34STc3U6FFL+sY52W+fs23PM9V7+6mb1ezKXRXQ64y9AD3GW6RVTLCu49pt0jgHvsCXfHcJeuLfNkzn3H+y7ujH4/npxPl1RqBtxluAHuMt0iqmUF9x4zM8A9spy7+CGmRrjnFv7ymbbwwF3MGuAuli6iiuZ8HxzcB5Vwd+vc5QOqT8yW2eHci4zNvewvhxOFc5exBrjLdIurFnCvNMXL5XJl/I+0TIHd40srIdynysi5XyzM8t3dKxUJ+osydd8Qz2QPXHbXqbqb/bGsg902a8uwtkyFArIoNYd7j2Oq/aRlzEdTEyB7KM59oo6vfmXHRDOO7zwmcN8pS/NOXpDtlMIydjfWsoJ7X2OqwL3yz4vGBjYv4HAqpMy5T9fO/WjP0ozvfXE3+6CZR7u+A4C7TLdj4B4D3JWamfO9r7Q7cI8M7o6eUK3LqFxQae8LpVT+zXTxaKtZxUsr4H4h464vv8pPgTtwd6RAD3Af2miq27SMZ7iv159R1w/Vy6PfHF/6rhJJW/zqAO7CvyHya778zeG4ea008z/FakoyoFojTkof4dx3+OLhLAZZhLLDtIz4TUyWA6prh773hV5cbDpVs5n6wYE62v/UkO/O4f4//svsaP+zo/1P7H8+/d//emOy9Qhu0TpuN4C7Wz2DPZo53Pt6X3YPzn1oo6lunbss567UrGr5gTpYP4b7+i0f+fNNk4l6YfSz4ytndbXWLt4t3PWpx2M1ntj/jPPL1s/feiAFcPcgcginsIJ7L2OqwH3H3xbOQ8ehcxev5z4eK8GAanlZYP3Gj5lS37uu7mV/qee7W7g7b5HuDgjcu9M2qCNbwb2XMVXgHh3cpatCtoa77lrnFniqns5+cnz1H1WIB+5VyjTsZ0DV0XCih28Cc74D983nmtKY5B5QWmZvx6qQdawppWU2ukqehVfqYKxeyf6w8wjAfacszTuBO3B3pIBv5z7AqTKhwN2Rcy8ory38TKn/t7/cnisJ3Js5vjXFKK8C3B2hrQjU7jZw7k/kPQY4VSZVuOs+oxE/nqiXRu8dX/62IBpwL6Sw2wDuKcK9l0UIfDv3AU6VCQfu2/66gTvrtMx0+sTX804fNJ2qG0pdO1RH+5/oYwL3Bm132nacezxkt3pItZfZkMC9mVw7cWa10+lsGfmAqgzuhneqLfx0qp7Nfnp89fTgMH9oqDzZxvA4sRdjtkzsLWh1/eaZmeVyaXXk9oWBO3CvXlHA2LkXgTidqv80m/33/zw7vvztj0a/zJ8L9fX0UHEN/W4A937193x2c7j7nzAD3IF7I9ztHty/oWYvjn6ukxL3s4+fyl6rege3537o53TA3Y/OgZwFuF8AlJy7MBX7OEXb5iEm+7TMl4K8Shnu+mbvjH5/kC/tkj8mGkif7O4ygHt32gZ4ZOB+DvdhzoN0O6Da7gXZX9h9tZynZeyIvA3340uro/3Pns7emK1TNGkjHrgHiODuLgm4n8N9mPMg3cL9uewtGRzbLz9g2EN2wl1/qbyS/fH6OF+DTHYLhhfQbzHg3q/+ns8O3M/hbv52vWSeTdWh5nC2TJsXZLdcW8aw29TAPUf81a+eH70zmSY70ArcDeMkjWLmcPc/1d3rgOowE+5unbvfnPv5kr9W/bAB7uvBg1ezj75/kE9pTs/CA3eraIm9sBXc5/OFz/sF7heDvd3p7tC5y+A+VbM267lbKWMC99zCX/7mpdGvDiepDbQCd6toSaCwOd89L/wL3KODe5uHmKzfoWrtrKezG2qWr/n+eHpP/cb9/b/dzF7XE2lqznW+FGUMjy+u4f6L+ruu+5TlB2Jo5fJ3kjncPU91B+6Dgrtktkw5jpu313Av5rnXUaxE/zuj31/Ln2itzNLol3XczF67mb0e+M9T+6/dHr1reOM7igF34O5IAeAO3BseYmoG+pOxaOXcL+i29+Wz2ZvFGgZbJ1U/Hv32onDpiyG1ncD9yXDaigQfHdbqpDj3vEkYUG1PIvlr9sbK/iEm4YCqeVpmQ5C72Yffu5537s0UzVTdzf64UTjNX4E7cHekgD/nbv795n/OkNUXtaCwwwFV/w8x2d6v6YBqlfu+8s8XRj/LB1rLi9IAd0cdfqM1X8nel39HXjlbj4cHZ6U37rHrX83JlmzOfbCPp7qdCvl89s6mqzXr9iE8xGTOkbvZh9cO1Wz2eF1J4G7WyrYgA+62im2XB+4z4G6OtpqSbdIyQTzEVGXYt/df/val0Xt6URoF3IF7Nwpsw9p2D3Cfma89kNjjqW6duxDu0/DmuW/TfNee+/t/W7/3g5x7J9kPnLstyrfLm8Pdc8LZX859sGsPBAH3AB9i2oXyqj9Z7ox+V/Um7qoqse5nQDVUh76Ndb3HCu4+H1L1B/fBTpVxDfeHgpz79Ny5d/8Qk8ofYrKd524E4stnRsVsvjNCPCBwB+6OFADunfy1u/El73C2jDAts3buR3uf2+FsveTvxr00/iqc594E5aP9z/4t+4/jK1/b3ULTYYM7GnB3hLbGQHVVwMq5+1yBALhHBvc2S/56m+fehXM/2vv8cKzGE/Xy6DfBEdnhVwhwjw3uVm/K9vkmVeAeGdzbTYX04NzVDaU6gfv+Z+czZ5R6av/frb+oHPK300MB96Th7nOqO3CPDO6yVSHVeVrGQ869a7jnM9/zpWamKn8O9vK3qbl44A7cHSkA3AcD94k62v/UDoWSnHvncFfqnO9KqeuH6v7+X+1uqlPf3f7gwN0R2lyl1E2OY552x7nPTQSNqEwQA6rRw/3zdVrm4ss4nzW0dvHPZG8cX/4mEcQDd+DuSAGc+wUsuvu26B/u66mQkT2h+qQLPtrbhLtur/XEUDWZqFezP6XAd+DuCG3ddeftI+Pcz1Zm/3hCtQZSbaZCWg9C7j0SzKnvaJ57FdzLiL+ZvX589asa9SL4CLgDd0cK4Nyjc+6Sh5j0gKo93IVL/nYyW6bCuT+G+3kifjqNfOV34O4Ibdv+urs9OHece/VrMZ5MQdQYzHbO3cNsGbvX7NXc6cZH9c69jHg1VU9nb1h/kxk3wcaFOf4VuAN3Rwrg3Afk3JPMuW/YsYt3OU3V89k78c2VBO6O0LYRGJ3+inPHuTtx7m3SMt6c+88d+9lLq6P93QOqOzvtdKoXgs+n00Q2V3Lvy2sHaudNdbGTVSGdqArcgbsTuL8rGOT0nHMXv2av5ivBJC1T7qjTaf6uj5vZ6/eyj4+vnv6f/ZP/u78M/mdx7TB/REvWxOXbN9wG7oZC1RcD7sDdAdzlr9nL57l7WH6gz5y77oE51tfPN708+vX5t8WVs/HYnx2uB0Hjp97IrtQMuDc2h0kB4A7cHcD9diZ17rHD/XxtmboxkiLh/mz206P9zy7+DrhydhgP3E1o4qoMcHeiJHAH7g7gLl84zMsTqtNpZ869Ce7asB+M1Y7XegD3ilFK4A7c6+ySoTq8rOPCSLaYdTfctEz1gGqex5jmD6m+MHq4+yEm4A7cKxQwxFd9MZw7zt2Fcx+9I8vJjnPnXspUmHzBSBYO68y5VzzEpA37tYNdhr24R+BegTacez21DT8F7sDdAdzbLPl7vOdtKuTPnPyZUj7I9myZ9ZecOpyol0a/apjPDtyBe4UChviuLwbcgbszuK/ng9jlysZjZf3QZlDOvZSWOZ8smD+J+pP72cfl74Dd28C9Am0493pqG346dLgvl0uzdcNWLBy2m1DrJINefkAK95id+2O4FwOnFzMdi/RL1QZwB+4VChjiu74YcAfuTpx7PhXSGu4JLPmr4b5+B9Nz2Zt2f4UA9wq04dzrqW346dDhvlgscO41ltzwI6FzX8PdDoiXVsfStEwnq0Lufz6eqGsH6s7o94ZaXRQD7sC9QgFDfNcXA+7A3Ylzl64tM1FHe56eUO0I7rdH7x5f+foC2VVJmO39wL0CbTj3emobfjp0uM/npnBfrVJLuzt8E9MLoxZw97X8QBdwv3+lxVs4gDtwr1DAEN/1xczhvlwu6w/l8FN/S/4Cd4nl3DKh8qmQHpcfcAz3vS+fy97KbfuWGqZ7gHsF2nDuTmBqDvfFYuHkjCYH8Qd38/vHudcwS/6yjjjh/htBfVYAABugSURBVNLoveuH6oZSt0cPa2Rp+Ai4A/cKBUwoWV/Gimxpwl2p2WBXIHCYlpHD3eM8dyfO/V728dPZG0qt17+dAne7xxrqeVR8inMvpBBvWMF9Pk/RuQP3BndplnOIAu5t13O//N2PRr88yNdxfLyyOXDvxngCdzHTi4rAPfcdOPf2fNc59+nU2sfF8oTqK9kfruV5GP0qpce3CdyBezcKFIwWb1jB3ecTmv5y7sC9PdmPL63aOHdv71AVOvcrX78wejie7HoVUTxwly3rVpClZfXiOIYbOHdDoWqKmcP99NFZzXGcfwTcH3vDLn2B85x7es79lez9a4elPMxGc0QC9+JtIU9nb8h+iiM47+o7Dwjcd8pitRO4k5Zx8ART4dwlcPe45K/dgGo+0/HNBqhFAnel1Hpp5U/Ff6X9ePSb/Csu/+fDdgD39joDd+DuEu6CiJRAp/vlB348+m1u2BtfCR0N3GcHY3V89VQM97vZB4LGFVcB7mLpiorAHbi7grv0CdXApkIe7X/6VPaang/TnGiODO7yh2mBewHNWDaAew5387XDEnuOyWHOXb78QDhwv/ztj0a/zN9Y3WjYi9REZHD/Rwvn/qFPqOHc26sN3HO4D3YFAodwly8/IIV7s60uELzeuKFmNTn3V7OPvnc9L2d32LjgvvdIDPdXsw8FAypiQgF3sXRFRXO4+3w8VamZ19ky5irg3Kvo0GYqpP2Sv4/sEFwP96unz2VvTdYvs7Y+bGRw/7Kq+Rr3v5r9CbgX3Ax/w4ppKcN9sFPd+3fu05noBdl/15NYrPrYTud+Z/S7g7G9YV9/W+Rnjwzulm+8Kj2cDNytgq33wlZw97n2gG/nDtwbjVtjAWHO/fxNTLbruWu45yk1859NuO89KpaIsTbsxXmjgbs6GCvrh8VKcL+XfTSxf/zYvHU2SpKW2RDE9ldzuHt+ggm4WzDLttXL5ft37krm3L8Q4LgM95dG740nNgOnBc03NqKBez4V8sh23fwn4P7nycRTWCo1A+7lfirYBu4XwTrM5WUcwl3o3NVsLHCUlvPcdQ7nxkz91x/Ojve++P5BTmjB18OOPhYN3NfOff+zxr/Aqgrcy/6Sfx1ufLd19itwbyk1cAfuD6o6s+1+2WyZ6fk7VC1zwTZwX0M8R9uPR789vvzN9wVTYmoQFhncP7Ft1qI8cG9JW8/VgfsF3Ic51d2hc38ue0vmhderQnYC9/x61jPWn8veLNLNT2WvzWpgbftRVHC/v98G7h/j3D0Dus3pzOHu8wV7+o68ToUc7FR3p3DPl2ERhGNHaZnpNOf0tUN1Z/R+YT+PL62GCffpNP/b5f7+38pSWG3f3/8rcBeEdy9VzMm+Wq08z4PsYUB1mBNmHMJdlpZR65z78Z5L564N+3iins/eOb7y9QbChgl3pfIB1fvZXzfUMP81h3v+lpKLP3Y73Sbn3kZeK7j7XMld35Rv5w7czfv5zpLt4P7FzmNW7qzOua8N++wHB+qV7A87qw8Z7veyj3dqYrLz/v7f8oUZgLsvBdpIbQ53//Mgce6e/JFD5/589o4gLZMPqDp6Qfb67OpwrNZv5PiuCljDhvufq2Rp3H9//xPg3ga4PusC902ADnA2pEO4y5cfmNjngp907sWS609nP2kcMxws3A/H6tXso0aIVxU4Au4xeHb9FQLcN+E+wAkzvcP9sXO3nMVRgrs27D84UC+Pfl0FpvL+YcP9T2UprLaP9j/Fuft03+JzmZN9tVoNJS0zwLUhHcJdlpZ5PKAqyblrwz6ZqFvZW8fG6x0OGe53sw+tgF4ufLT/2QE59xjMuxXc/U+V6SfnPsAxVYdw12kZ24UD9UNM1o/Fr53745mOvy8zqHF72HD/oFGfqgJH+58Dd7Gb9lnRCu7+p8oA982UUUfB4RDuwuUHzhcOs54KeThWt0cPj6+cVcGoav9w4T6pnEFUpVV5P3DvqA86P6w53HvJyQD3+OAuG1AVLz/waiZMHw8a7k8+z1Vmd+P20d7fr5OWSSstMyy4L5fLlfG/Xv6icfs979C5y+Gez5aRP1zTSKWNAkOG+52RXQrrCen2/n79kHnunlxXm26Oc9/dSEMbU3UOd9ucu7J9WceVs5bXPFi4j8fqzuh3T/C6tKJv8/69L4B7G+b6qWtO9l4WHtAi9PCEqj7xoGa7twRlmQgenlB9afTeZKJuZq+Xz2u7PVy4T9brYloBvVwYuKeVk+nxjaHAffffFm6//x3C/fmR5AlV06mQe39/Nvtp/ppTNQPushgYT0wfBdj9fbn3Jc5dprzPWubOva+Ee28DqlazIXv86nMVLg7hfit7W7D8gIZ7sR7vTqzcyt5eL1l1/noN4C5r/fFEvTR6b6fCRjv3Hl0j5x68eQfudaZ4UM+pOoR7G+d+tLf7Har3sj8/mz0oVhfQUAPuLeD+KyOOl7MxxfZV4F7HDVmjuK1lTva+nk3V99tbWsbKvMc+YcYh3GWzZfIB1d2v2fvu2ezBztecAncZESYT9aPRL1vA/R84d5ny3mpZwb2XZ1OBuz+D4BDucueerwr5xLs9Xx79ejLJkzD6Z6NvAPcNQQx/nUzUi6NftID7V8DdUOq+ipnDvceEe585d5y7rP/L1pbRC4cd7z1eW+bq6S39ur7qlzoBdxk71nD/uaxx81pXv7p2wDx3f8ZL0MrAvbl5hpN2d+jc202FzJcfeH70zvXDfMSqfmAWuAu6vVIz4C7TLZZa5mTvN+Hes3O3kinqtHsIcJ9M1b/+t9mt7K3JRKkmsjMVUswa4C6WLoqKVtTqMeHeM9yHk5lxCvd36x33zh4ync4eJ9YbDHtRHedeSGG1Adyt5IqusDnc+024xwT3qGe79w53pc7hbv7FANxl3AHuMt1iqQXcmxPuui0HknZ3CHfxbBnbzgPcbRXT5YG7TLcoapmTvfeEe//OfSCZGYdwF85zt3/kD7jLcAPcZbpFUcsK7v0m3IG76V8YLSMPuLcUUE3X7wwpHuO03bhy5u3FpMC9bVvbGxFvZzSHe+8J98jgHm/aHbi37X7AvRvkvZK9L5+Sf+XsMJ955ckh9X4ic7KHkJMJAu5DWNsduLftmcC9G4YCd/PItIL7crk0P3JHJftcW6a4peTXdncJ90wyFbKQ2nyDnLu5VuWSpGXKaqS0bQX3EJ7LiQzukWZmXMJ9BNxX1pkEcu4Vxh/nbvj1Y0X2EBLuQaRllJolPyESuBt2ocpipGUq6FypmFl54G4oIHCXD62knZkB7oZdqLIYcDeDdaWAFdWBu6FiVnCfzxeGh+20WBBpGavZ7jFmZpzC/aH5U6ZtQoecu0w9cu4y3UKuZUX2QHIyoaRlks/MOIT7c9mbwJ2cuysU4txNlATu8pyM1jfhzIwTuN/f/+Tp7I3H63+1VbsxpnHujRLtLIBz3ylL1Dut4N77g6mF1KGkZdLOzLSF++VvXxq9dz1/b7Lpmo5FA4s3gLtMOuAu0y3YWlZkDycnE1BaRqnZcrlcGf8LYRqpeTi2gfv97OPvH6gbs3xZR/Mzti8J3GUaAneZbsHWAu4OsgRWIg4C7le+fmH0cOfbqz30BOAuExm4y3QLtpYVlwKZJ6PFDCgtk3BmRuDcX80++n7+Lk1/eZiN3gXcNwQx/BW4GwoVRTErsgeVkwkrLZNwZsYO7ntfPJM90AOnnlMx5f4G3MtqmG8Dd3Otwi8J3B3kZHQzW0kZ0YR3c7jfGb3veeC0qoMB9ypl6vcD93p94vrUikhB5WSCc+6pZmZM4H60/8nN7LXZOg/To2Ev+h5wL6Sw2gDuVnKFXNiK7KHlZEKEe5LrzDTA/fI3L41+1dfAaVXvAu5VytTvB+71+kT0qRXcQ1jjd0PbsAZU9cWZP80US2amBu73sj//4EDd6G/gdCMgil+BeyGF1QZwt5Ir2MJWZA8TRMDd2YBBTZjuhvvV09ujh5OpUtPepsTUXHNocH9h9NB61YHibXxxLfmbP63mIyyVmr0y+kMrVdN9E5MV3APMyYSYllFqZvVupjC/Mzc65zbc72YfBDJwunGpxa9t4b7/79OpGk/c/Ewm6vbo3VYYGnsiZnvnfjN7/ZnswTPZG93/PADuRcBvbFjBPZwlB8p3EaJzT29Y9Qm47335XPamduveFoopN7nhdku4H1/+xvFPYcMFGxE5d8Hd9VUl3XeoWpE9TNseqHNPb5HIZ7I3tOu8M3r/cBxoHmYD+m3h3hdxdp4XuO+UpeVO4L5eLgW4W+cQkxlWnU7VZKLujH53M3tdz3TcwGiYvwJ3Wbu0Tcu0BK7P6onC3cq2h5wWDjQtk1JmRudeJutR05DzMBssA+4bghj+CtwNhQq2mBXcg7Xt4aZlkhxWDTaad14YcN8pS+NO4N4oUcgFrMi+Wq1Ceyq1rG24zj0l815WPJZt4C5rKeAu0y2QWlZwD9m2B+3cbYdVQ05+BRK4VpcB3K3kKgoD90KK6DasyL5arQJ8KrWsedDOHfNebirP28BdJjhwl+kWQi0ruAdu20N37raLAGPeHfYQ4C4TE7jLdAuhFnC3ntTYstmSmRPZUgfP1YG7THDgLtOt91pWZI/CR4aeliEz01fQA3eZ8sBdplvvtazgHn5OJoK0jFIzK9Gj+EbtPY5NLgC4m6i0XQa4b2sS/h5byIQ8A7JQOwLnjnkvWsvnBnCXqQ3cZbr1W8sK7lHY9jicOw809RL3wF0mO3CX6dZjLSuyB/7gUlnGOJw75r3cZn62gbtMZ+Au063HWlZwj8W2R+PcMe/+Qx+4yzQH7jLd+qplRfbVahXm0u071YvGuduad0ZWd7a3+U7gbq5VuSRwL6sR/rYV3COy7TE5d8y7534C3GWCA3eZbr3UsiJ7+OsNbGgYk3PHvG80Xqe/AneZvEOC+z8PY36Hqi3Z47LtkTl3zLsMN7JaT2Wvyd9Z6vOVESbnuvzNQSzvUDW5nUDKXP5mUHCPKNuuu3xkzh3zLiO1bS399qjbo4cvjn7xo/h//uWHM2+vSZlO1UypF0e/SEO6mtb/lx8qb6raBnBj+eRte3zOHfPeGLWuCqwhNbuhUviZqRzurpSpP44+URq61d3FbOZT1XrNBZ/awj2KR1I3dIjPuWPeN5qQX1EABawUsCV7dNl2rUaUcLdtm5OTuVXbUxgFUCBhBWwBEqNtjzIto2POah1g5rwn3FG5NRSwUsCW7JHa9ojhTnLGKqApjAIoIFhiNmpfGGVaRofpcrlc2fwjOUP3RoGBKzAc2x63c8e8D7yjcvsoYKXAoMgePdwXi4WNd19h3q06A4VRICUFbOG+XC6jvv2I0zJad0ZWo44/Lh4F/ChgS/Z4x1ELPaOH+3xuZ96jHiEpmo0NFEABcwVsyR7RGzlqRIge7mTea1qXj1AABQSTZBKw7dHn3IvAJTlTSMEGCqBAWQGBbU9jcC4F567UzHZaJMmZcvSzjQKpKiAgexq2PR3nTnIm1c7JfaFAGwVs4Z4M2ZOCu20rYt7b9BnqokD4CgiYEN2i7TWtkEhaRt+hbeYdvtdEBh+hQNQKCMiekm1PyrnrQLTlexojJ1F3Qi4eBbpQwBbuiZE9Qbgz7b2LfsIxUSAuBWzJvlqtUkrI6MZKKi2jb8nWvJOciavfcrUoUK+AgOzp2fYEnbtudfheH/18igKpKgDZi5ZN0LkL3rOKeS8Cgg0UiFoBAdzTS8joFkwT7oJp7/A96i7NxaOAYJmB1WqVZEImcbjDd3o7CgxKAYFnT5jsyebcdUwLZs7M57xKezYoInCzaSggIHuSM2TKrZlsWkbfJCOr5cZmGwVSVUAA97Rte+LOXccxfE+1P3NfKKAVgOw7IyFx5y6bOcPg6s5YYScKBKgAZK9qlPThLhtZhe9VEcN+FAhHAQHZk0+1F60zCLjL+M6yM0WUsIECASogI3vyqfaipYYCd/heNDkbKJCGAgK4D4fsgxhQLeJYMDOS5EyhHhsoEJQCArKn8dpr81YYkHOXvY0PvpsHEyVRwI8CMrIvl0s/lxfIWYYFd1lyBr4HEqxcBgrI1hhIe5mBqqgYHNzhe1UosB8FwldA5tkHlWovGnGIcJfFB/69CBo2UKAXBWQ9d5hkH9aAajkcF4vFyv4fkyPLGrKNAp4VkMF9Pl94vs5ATjdE566lFyxLgHkPJGq5jAEqICN7qmu1mwTAcOFO8t0kPiiDAiEoICP7YBMyuskGDXf4HkK/5RpQoF4ByF6vT9WnQ4c7fK+KDPajQAgKQHZxKwD3mSx6yL+LY46KKGCogKxvDjwbU2gL3PMXD8kmz8D3IozYQAHnCsjITq8sGgK4n79Vbrlc2s+NzGswP7IIJjZQwJUCYrIPduLjtvLA/eKVobLJkfB9O6rYgwJtFBCTfcgTH7cFB+4XcBcPrsL37cBiDwrIFBCTnVT7huDA/Qm4w/eN+OBXFPCpAGR3qDZw34Q7fHcYXhwKBcwVgOzmWpmUBO474A7fTUKHMijgUAHI7lBMfSjgvhvu8N15qHFAFKhSALJXKdNmP3CvhDt8bxNY1EUBEwVOTuaQ3UQoQRngXgd32WtX9Xx5HbWCJqEKCgxEATHWh/lmJduoAO51cBe/06t4HopHnGwjkvIDUQCyd93QwL0B7vC96xDk+ANUALJ7aHTg3gx3zXfx86s84uQhjjlFRApAdj+NBdyN4K4bA777CUrOkrACkN1b4wJ3C7i3mT+Df/cW05woWAUgu8+mAe52cG/Pd4ZYfcY35wpEgTZTHpkbI2tE4G4N95Z8x8LLIpVa8SrQxrBDdnG7A3cJ3OG7OOCoODQFIHtfLQ7chXCH732FLOeNSAHI3mNjAXc53J3wnRR8j9HPqbtToGWSnWxM+6YB7q3g3p7vpODbBzFHCE2BloYdsjtpUODeFu5t3q/NKgVOgpiDhKNAe8O+Wq2Wy2U4dxTvlQB3B3BXatZmiTEWGou3/3DlZQXaG/bVasUbrsuSttkG7m7grvne5hHWAvFtmpO6KNCXAu3JfvrojCEoh80H3J3BXbeKE74T4g5DnEN1rYCTVAyvt3beTMDdMdydDLEyyuo80DlgRwq0N+wMn3bUNMDdPdwd8h0L31Hcc9j2Cjgx7JC9fUNUHQG4dwJ3J1NoyMJXRS37e1fAiWFfrVaLxaL3e0n1AoB7V3Bvvwp8eaIkFj7VHhjdfTk07ER1p60P3DuEu2659kOsWPhO+wAHN1TAFdZJxRgK3rIYcO8c7q5S8HqUFbPTMuKpLlPAVR4Gssv0F9QC7j7g7moWfGHhQbwg1qkiU8CtYSfJLmsFQS3g7gnuum1cpWiYKymIdaoIFMCwC0QLpApw9wp3hykasjSBdKFUL8OhYScV00uQAHffcHebogHxvXSbtE/qHOssF9NLwAD3HuCuW9phioYsTS+dJ72TusU6hr3fCAHuvcFdP+jkEPG6Z/YbT5w9XgUcptc11hk77TcYgHufcNdt75DvZGn67U4xnl17Audkj1GKxK4ZuPcPd6Vmy+USxCfWtcK/HedJGAx7UI0O3IOAu44Jt3zHxQfV04K6mC6wToY9qCZWagbcA4K7tvDFkjKuNoq/u0MLPq7HvwLdYZ0Mu//WrD8jcA8L7g6XG9v+btAduz4g+DRVBTrCOoY92IAB7sHBXcfKYrFwnqVh9YJg+2GnF9Yp1pnD3mnbtTk4cA8U7rpRO+I76fg2fSaiup1inRfjBR4JwD1ouDt/nHUjV0OiJvD+Kb687rBOHkbcKJ4rAvfQ4a4DorssTeHiWWnSc9/r4nSa6W4nrZcNwemjM/IwXTRcF8cE7nHAXbd9d1ka0vFd9C5vx+ya6Uxg99aUDk8E3GOCe6dzaQqDVpDCYZxxqI4U6DT9UoQE6fWOmq/TwwL3yOCuo2E+72ouTdGfSdd02vFaHrz4Ai63Vxfbp4/OyNe1bKy+qgP3KOGuw8UP4qF8X51z+7zemK7zMKTXt5sgoj3APWK46zjrdKx1wwwWcIkoxBO41EL2jebo6FdGTROIGZYfiJ7sRRT6RDxevpC90w3PTGfUtNPW9H9wnHs6fHe+QLyJMSwA5D92Uz1jIamJ/q7KnD46Y3GYxCIKuCcFdx2dnl285kuBJMbfBIwoq+eK14bHAeuC9oqiCnBPEO49Ih7Qm3f7HoGum4ncunljxVgSuCcLdx2O3mbUVPnEMsJi7CFur7msRpViHvaDdbfNGubRgHvicNdhpxHf9QOujVQqo20g2ZuNW26UqNMCp4/OmLceJoi7uCrgPgi4F6Gju3enBDE/+Ab4EsD99h2Zq9FpydNHZ8vlsggDNoagAHAfFtx1TPcy4moCr204hkn8ndfZ3XJdJtLtLKO/y3kWaQgo375H4D5EuOs4CCRXs5NK5Z1VJC3v347sNnvKR965Xb68MLex6m0CII26wH24cC8iOFgjb87NnQgW7zQ/b2glsepFVLMB3IH7uQInJ/OgMvKhcTPw62G6OjTfUAC4A/dNBWJJ1wROWz+Xp9MvYY5MbLCGXz0rANw30ea5AUI+HZT3A2jBWUi/hNxxArk24A7cmxWA8gL+dlEFpgfCzSguA7g3oy2KhvRzkScn8+VySWq+C3BXHVOrzTOlfiI8pbMAd+AuVEDPsen9qdcqJsa+XzOdJ49Soq3newHuQrR5bqeQTzefL7DzTr5LMOkhx3l01wbcgbtLBYrsPI7eEPcAPTpoxnLBwN0l2mJpdT/XWeRtAP0G6AG6nwgc+FmAO3D3ocDJybxs6oeG+4Lmi8WCOekDZ6632wfuPtDmrTkjOlE5U58Y6wuU66dGoXlEYZnSpQJ34B6EAtraFwOzmo8b2YzQfi1DXHN8PseYBxFOKTFafC/AnVgMVwFN/MXiYjbOBk+7xv3G6fSvi8ViPs9/xL2OiijgQQHgHi7aPDR/7KfQ9J/PFzVfADsBXbUzP9BjdpNOiT08Bn79wB24owAKoECCCgD3BBt14IaF20cBFFBqBtyBOwqgAAokqABwT7BRsS0ogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqABwT7BR8SwogAIoANyBOwqgAAokqMD/B9cbPEyIHvopAAAAAElFTkSuQmCC"
					/>
					<div className={styles.exploreWelcomeText}>
						<h2
							css={{
								fontSize: "3rem",

								"@media (max-width: 768px)": {
									fontSize: "2.4rem",
								},
							}}
						>
							Good {getDate()}!
						</h2>
					</div>
				</div>
				<div className={styles.exploreVideoList}>
					<h2 className={styles.exploreVideoListText}>Today&apos;s videos</h2>
					<div
						css={css({
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						})}
					>
						<div
							css={css({
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-around",
								width: "100%",

								"@media (max-width: 768px)": {
									flexDirection: "column",
								},
							})}
						>
							<VideoCard vuid={"x181c2etzrzqvd4o"} />
							<VideoCard vuid={"15xqiownj1672fjysg"} />
							<VideoCard vuid={"14t5jd0s6oklq5cli"} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Explore;
