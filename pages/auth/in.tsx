/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { SetStateAction, useState } from "react";
import styles from "../../styles/Signup.module.css";
import { useCookies } from "react-cookie";
import { Card } from "@huelet/foundation-ui";
import { jsx, css } from "@emotion/react";
import { WidgetInstance } from "friendly-challenge";
import Loader from "../../components/loader";

const AuthIn: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const [resp, setResp] = useState<string>("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [captchaToken, setCaptchaToken] = useState("");
	const [JWTcookie, setJWTCookie] = useCookies(["_hltoken"]);
	const router = useRouter();

	const container = React.useRef(null);
	const widget = React.useRef(null);

	React.useEffect(() => {
		if (!widget.current && container.current) {
			(widget as any).current = new WidgetInstance(container.current, {
				startMode: "none",
				doneCallback: setCaptchaToken,
			});
		}

		return () => {
			if (widget.current != undefined) (widget.current as any).destroy();
		};
	}, [container]);

	React.useEffect(() => {
		const checkCookie = async () => {
			const token = JWTcookie._hltoken;
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
				if (resp.status === 200) {
					router.push((router.query.redir as string) || "/explore");
					return true;
				} else {
					return false;
				}
			}
		};
		checkCookie();
	}, [JWTcookie]);

	const handleUsernameChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setUsername(event.target.value);
	};
	const handlePasswordChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setPassword(event.target.value);
	};
	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		setLoading(true);
		if (!username || !password) setResp("You forgot to fill in a field!");
		try {
			const resp = await fetch("https://api.huelet.net/auth/in", {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				headers: {
					"Content-Type": "application/json",
					"frc-token": captchaToken,
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});
			const data = await resp.json();
			setLoading(false);
			if (resp.status === 401) {
				setResp("Invalid username or password");
			} else if (resp.status === 200) {
				setJWTCookie("_hltoken", data.token, {
					path: "/",
				});
				router.push((router.query.redir as string) || "/explore");
			} else if (resp.status === 500) {
				setLoading(false);
				setResp("Something went wrong. Please report this bug.");
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			setResp("Something went wrong. Please report this bug.");
		}
	};
	return (
		<div id="klausen">
			<Card title="Sign in" full={true}>
				{loading ? (
					<Loader />
				) : (
					<form id="form" onSubmit={handleSubmit} className={styles.form}>
						<input
							className={styles.input}
							id="username"
							type="div"
							name="username"
							placeholder="Username"
							onChange={handleUsernameChange}
							value={username}
						/>
						<div className="spacer-sm"></div>
						<div className="pwd-input flex">
							<input
								className={styles.input}
								id="password"
								type="password"
								name="password"
								placeholder="Password"
								onChange={handlePasswordChange}
								value={password}
							/>
							<div className="spacer-sm"></div>
						</div>
						<div className="spacer"></div>
						<div
							ref={container}
							className="frc-captcha"
							data-sitekey="FCMM7022N09KS3T5"
						/>
						<button className={"button-primary"} id="submit" type="submit">
							Sign In
						</button>
						{resp ? (
							<div
								css={{
									backgroundColor: "red",
									marginTop: "1rem",
									borderRadius: "10px",
								}}
							>
								<Card>
									<p>{resp}</p>
								</Card>
							</div>
						) : null}
					</form>
				)}
			</Card>
		</div>
	);
};

export default AuthIn;
