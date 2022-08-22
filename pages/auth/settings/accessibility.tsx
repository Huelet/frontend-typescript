import * as React from "react";
import type { NextPage } from "next";
import { useState } from "react";
import { useCookies } from "react-cookie";
import styles from "../../../styles/Settings.module.css";
import { useToggle } from "@mantine/hooks";
import { Slider, Switch } from "@mantine/core";
import { Header } from "../../../components/header";
import { Card } from "@huelet/foundation-ui";

const Accessibility: NextPage = () => {
	const [cookie, setCookie] = useCookies(["_hltoken"]);
	const [username, setUsername] = useState("");

	const [sounds, toggleSounds] = useToggle(true, [true, false]);
	const [captions, toggleCaptions] = useToggle(true, [true, false]);
	const [motion, toggleMotion] = useToggle(true, [true, false]);
	const [highContrast, toggleHighContrast] = useToggle(true, [true, false]);
	const [invertColors, toggleInvertColors] = useToggle(true, [true, false]);
	const [grayscale, toggleGrayscale] = useToggle(true, [true, false]);
	const [autoplay, toggleAutoplay] = useToggle(true, [true, false]);
	const [zoom, setZoom] = useState(1);

	React.useEffect(() => {
		fetch("https://api.huelet.net/auth/token", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookie._hltoken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setUsername(data.username));
	});

	React.useEffect(() => {
		fetch(
			`https://api.huelet.net/auth/accessibility?username=${username}&options=*`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${cookie._hltoken}`,
				},
			}
		)
			.then((resp) => resp.json())
			.then((data) => {
				const {
					sounds,
					captions,
					motion,
					highContrast,
					zoom,
					invertColors,
					grayscale,
					autoplay,
				} = data.response;
				toggleSounds(sounds);
				toggleCaptions(captions);
				toggleMotion(motion);
				toggleHighContrast(highContrast);
				setZoom(zoom);
				toggleInvertColors(invertColors);
				toggleGrayscale(grayscale);
				toggleAutoplay(autoplay);
			});
	}, [username, cookie._hltoken]);

	return (
		<div id="klausen">
			<Header username="" />
			<Card full={true} title="Accessibility">
				<Switch
					label="Sounds"
					size="md"
					color="violet"
					checked={sounds}
					onChange={() => {
						toggleSounds();
						localStorage.setItem("sounds", sounds.toString());
						fetch(
							`https://api.huelet.net/auth/accessibility?username=${username}`,
							{
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${cookie._hltoken}`,
								},
								body: JSON.stringify({
									settings: {
										sounds,
									},
								}),
							}
						);
					}}
				/>
				<Switch
					label="Captions"
					size="md"
					color="violet"
					checked={captions}
					onChange={() => {
						toggleCaptions();
						localStorage.setItem("captions", captions.toString());
						fetch(
							`https://api.huelet.net/auth/accessibility?username=${username}`,
							{
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${cookie._hltoken}`,
								},
								body: JSON.stringify({
									settings: {
										captions,
									},
								}),
							}
						);
					}}
				/>
				<Switch
					label="Motion"
					size="md"
					color="violet"
					checked={motion}
					onChange={() => {
						toggleMotion();
						localStorage.setItem("motion", motion.toString());
						fetch(
							`https://api.huelet.net/auth/accessibility?username=${username}`,
							{
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${cookie._hltoken}`,
								},
								body: JSON.stringify({
									settings: {
										motion,
									},
								}),
							}
						);
					}}
				/>
				<Switch
					label="High Contrast"
					size="md"
					color="violet"
					checked={highContrast}
					onChange={() => {
						toggleHighContrast();
						localStorage.setItem("highContrast", highContrast.toString());
						fetch(
							`https://api.huelet.net/auth/accessibility?username=${username}`,
							{
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${cookie._hltoken}`,
								},
								body: JSON.stringify({
									settings: {
										highContrast,
									},
								}),
							}
						);
					}}
				/>
				<Switch
					label="Invert Colors"
					size="md"
					color="violet"
					checked={invertColors}
					onChange={() => {
						toggleInvertColors();
						localStorage.setItem("invertColors", invertColors.toString());
						fetch(
							`https://api.huelet.net/auth/accessibility?username=${username}`,
							{
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${cookie._hltoken}`,
								},
								body: JSON.stringify({
									settings: {
										invertColors,
									},
								}),
							}
						);
					}}
				/>
				<Switch
					label="Grayscale"
					size="md"
					color="violet"
					checked={grayscale}
					onChange={() => {
						toggleGrayscale();
						localStorage.setItem("grayscale", grayscale.toString());
						fetch(
							`https://api.huelet.net/auth/accessibility?username=${username}`,
							{
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${cookie._hltoken}`,
								},
								body: JSON.stringify({
									settings: {
										grayscale,
									},
								}),
							}
						);
					}}
				/>
				<Switch
					label="Autoplay"
					size="md"
					color="violet"
					checked={autoplay}
					onChange={() => {
						toggleAutoplay();
						localStorage.setItem("autoplay", autoplay.toString());
						fetch(
							`https://api.huelet.net/auth/accessibility?username=${username}`,
							{
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${cookie._hltoken}`,
								},
								body: JSON.stringify({
									settings: {
										autoplay,
									},
								}),
							}
						);
					}}
				/>
				<div className={styles.zoom}>
					<div className={styles.zoomLabel}>Zoom</div>
					<Slider
						min={0.5}
						max={2}
						step={0.5}
						value={zoom}
						onChangeEnd={(e) => {
							console.log(e);

							setZoom(parseFloat(e.toString()));
							localStorage.setItem("zoom", e.toString());
							fetch(
								`https://api.huelet.net/auth/accessibility?username=${username}`,
								{
									method: "PATCH",
									headers: {
										"Content-Type": "application/json",
										Authorization: `Bearer ${cookie._hltoken}`,
									},
									body: JSON.stringify({
										settings: {
											zoom,
										},
									}),
								}
							);
						}}
					/>
				</div>
			</Card>
		</div>
	);
};

export default Accessibility;
