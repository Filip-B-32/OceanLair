import React from "react";
import PageModal from "../common/PageModal";
import * as roomCallHandler from "../../communication/roomCallHandler";
import "./call-modal.css";
import { connect } from "react-redux";
import ActiveCallRoomsWrapper from "./ActiveCallRoomsWrapper";

const CallModal = ({ onToggle, isUserInRoom, errorMessageContent }) => {
  const createNewCallHandler = () => {
    roomCallHandler.createNewCallRoom();
  };

  return (
    <PageModal
      className="call-modal-wrapper"
      onToggle={() => onToggle()}
      title={"Call page"}
    >
      <div className="call-modal-content">
        {errorMessageContent && (
          <div className="error">{errorMessageContent}</div>
        )}
        <ActiveCallRoomsWrapper />;
        <button
          className="create-new-call-button"
          onClick={createNewCallHandler}
          disabled={isUserInRoom}
        >
          Create and start call room
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </PageModal>
  );
};

const mapStateToProps = ({ roomCall, error }) => {
  return {
    ...roomCall,
    ...error,
  };
};

export default connect(mapStateToProps)(CallModal);
