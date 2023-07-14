import React from "react";
import { connect } from "react-redux";
import "./user-video.css";
import Video from "./Video";

const UserVideo = ({ localStream, remoteStreams, screenSharingStream }) => {
  return (
    <div className="user-video-wrapper">
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((remoteStream) => (
        <Video stream={remoteStream} key={remoteStream.id} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ roomCall }) => {
  return {
    ...roomCall,
  };
};

export default connect(mapStateToProps)(UserVideo);
