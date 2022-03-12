import type { NextPage } from "next";
import styles from "../../styles/NewVideo.module.css";
import Header from "../../components/header";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

const NewVideo: NextPage = () => {
  const [status, setStatus] = useState("Waiting for an upload");
  const onDrop = useCallback(async (acceptedFiles) => {
    const ffmpeg = createFFmpeg({
      log: true,
    });
    try {
      console.log(acceptedFiles[0]);
      setStatus("Loading ffmpeg");
      await ffmpeg.load();
      setStatus("Compressing video... this may take a while");
      ffmpeg.FS(
        "writeFile",
        "test.avi",
        await fetchFile(acceptedFiles[0].path)
      );
      await ffmpeg.run('-i', 'video.avi', '-c:v', 'libx264', 'video.mp4');
      setStatus("Encoding complete..");

      const data = ffmpeg.FS("readFile", "test.mp4");
      console.log(
        URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
      );
    } catch (error: any) {
        setStatus(error)
        console.log(error);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div id="klausen">
      <Header />
      <div {...getRootProps()}>
        <input {...getInputProps()} accept="video/*" />
        <p>Drag and drop or click to upload a video</p>
      </div>
      <div className="sp-1-io">{status}</div>
    </div>
  );
};

export default NewVideo;
