import * as React from "react";
import type { NextPage } from "next";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const AuthOut: NextPage = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["_hltoken"]);
	const router = useRouter();
	const signOut = () => {
		removeCookie("_hltoken");
		router.push("/");
	};
	return <div onLoad={signOut}>Busy...</div>;
};

export default AuthOut;
