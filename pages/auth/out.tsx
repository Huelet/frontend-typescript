import type { NextPage } from "next";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const AuthOut: NextPage = () => {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['_hltoken']);
    removeCookie('_hltoken');
    router.push("/")
    return (
        <div>Busy...</div>
    );
}

export default AuthOut;