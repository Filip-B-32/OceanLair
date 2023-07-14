import React, { useEffect, useRef } from "react";
import "./video.css";

const Video = ({ stream, isLocalStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);
  return (
    <div className="video-container">
      <video
        className="video-element"
        ref={videoRef}
        autoPlay
        muted={isLocalStream ? true : false}
      ></video>
    </div>
  );
};

export default Video;
