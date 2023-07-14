import React, { useEffect, useState } from "react";
import minimizeIcon from "../../icons/icons-minimize.png";
import fullScreenIcon from "../../icons/icons-fullscreen.png";
import videoIcon from "../../icons/icons-videocamera.png";
import micIcon from "../../icons/icons-microphone.png";
import shareScreenIcon from "../../icons/icons-sharescreen.png";
import hangUpIcon from "../../icons/icons-hangup.png";
import UserVideo from "../UserVideo";
import * as roomCallHandler from "../../communication/roomCallHandler";
import * as webRTCHandler from "../../communication/webRTCHandler";
import { connect } from "react-redux";
import { getCallActions } from "../../store/actions/roomCallActions";
import "./call-room.css";

const constraints = {
  audio: false,
  video: true,
};

const CallRoom = (props) => {
  const {
    localStream,
    screenSharingStream,
    setScreenSharingStream,
    isScreenSharingActive,
    isUserJoinedWithAudioOnly,
  } = props;

  const [fullScreen, setFullScreen] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const [activeVideo, setActiveVideo] = useState(true);
  const [activeMic, setActiveMic] = useState(true);

  const changeCallScreenSize = () => {
    setFullScreen(!fullScreen);
    if (minimize === true) {
      setMinimize(false);
    }
  };

  const changeMinimize = () => {
    setMinimize(!minimize);
    if (fullScreen === true) {
      setFullScreen(false);
    }
  };

  const handleVideo = () => {
    setActiveVideo(!activeVideo);
    localStream.getVideoTracks()[0].enabled = !activeVideo;
  };

  const handleMic = () => {
    setActiveMic(!activeMic);
    localStream.getAudioTracks()[0].enabled = !activeMic;
  };

  const handleShare = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (error) {
        console.log("error screen sharing");
        console.log(error);
      }

      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      webRTCHandler.switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((track) => track.stop());
      setScreenSharingStream(null);
    }
  };

  const handleDisconnect = () => {
    roomCallHandler.exitRoomCall();
  };

  return (
    <>
      {minimize ? (
        <button className="minimized-button" onClick={changeMinimize}>
          <img className="minimize-icon" src={minimizeIcon} />
        </button>
      ) : (
        <div
          className={`call-room-wrapper ${
            fullScreen && "full-screen-call-room-wrapper"
          } ${minimize && "minimize-room-wrapper"}`}
        >
          <div className="call-room-content">
            <UserVideo />
          </div>
          <div className="call-room-footer">
            <div className="call-room-buttons-wrapper">
              {!isUserJoinedWithAudioOnly && (
                <button
                  className={`call-room-button ${
                    !activeVideo && "unactive-element"
                  }`}
                  onClick={handleVideo}
                >
                  <img className="call-icon" src={videoIcon} />
                </button>
              )}

              <button
                className={`call-room-button ${
                  !activeMic && "unactive-element"
                }`}
                onClick={handleMic}
              >
                <img className="call-icon" src={micIcon} />
              </button>
              {!isUserJoinedWithAudioOnly && (
                <button className="call-room-button" onClick={handleShare}>
                  <img className="call-icon" src={shareScreenIcon} />
                </button>
              )}

              <button
                className="call-room-button disconnect"
                onClick={handleDisconnect}
              >
                <img className="call-icon" src={hangUpIcon} />
              </button>
              <button
                className="call-room-button"
                onClick={changeCallScreenSize}
              >
                <img className="call-icon" src={fullScreenIcon} />
              </button>
              <button className="call-room-button" onClick={changeMinimize}>
                <img className="call-icon" src={minimizeIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ roomCall }) => {
  return {
    ...roomCall,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getCallActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CallRoom);
