import React from "react";
import "./profile-modal.css";
import { connect } from "react-redux";
import { getCallActions } from "../../store/actions/roomCallActions";

const HandleAudioOnlyChangeButton = ({ audioOnly, setAudioOnly }) => {
  const handleAudioOnlyChange = () => {
    setAudioOnly(!audioOnly);
  };

  return (
    <button
      className="enable-disable-audio-button"
      onClick={handleAudioOnlyChange}
    >
      {audioOnly ? "Connected only with Audio" : "Connected with Audio and Video"}
    </button>
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HandleAudioOnlyChangeButton);
