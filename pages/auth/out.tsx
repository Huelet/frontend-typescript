import type { NextPage } from "next";
import { useCookies } from "react-cookie";

const AuthOut: NextPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['_hltoken']);
    removeCookie('_hltoken');
    location.assign("/");
    return (
        <div>Busy...</div>
    );
}

export default AuthOut;