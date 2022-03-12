import { useRouter } from "next/router";
import type { NextPage } from "next";
import Video from "../../components/video";

const ViewVideo: NextPage = () => {
  const router = useRouter();
  const { vuid } = router.query;
  console.log(vuid);
  const getVideoData = async () => {
    const resp = await fetch(`https://api.huelet.net/videos/${vuid}`, {
        method: 'GET',
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    return resp.json();
  };
  const videoData = getVideoData();
  console.log(videoData);

  return (
    <div>
      <Video />
    </div>
  );
};

export default ViewVideo;
