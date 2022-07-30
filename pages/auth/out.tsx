import * as React from "react";
import type { NextPage } from "next";
import { useCookies } from "react-cookie";

const AuthOut: NextPage = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["_hltoken"]);
	const signOut = () => {
		removeCookie("_hltoken");
		location.assign("/");
	};
	return <div onLoad={signOut}>Busy...</div>;
};

export default AuthOut;
