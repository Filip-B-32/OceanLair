import React, { useEffect, useState } from "react";
import "./conversation-modal.css";
import sendIcon from "../../icons/send-icon.png";
import { connect } from "react-redux";
import profileImage from "../../icons/profile-image.jpg";
import { receiveMessage, sendMessage } from "../../communication/socket";
import Messages from "./Messages";

const ConversationModal = ({ chosenChatDetails }) => {
  const [sendInput, setSendInput] = useState("");

  useEffect(() => {
    receiveMessage({
      receiverId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  const handleSendInputChange = (e) => {
    setSendInput(e.target.value);
  };

  const handleSendInputEnter = (e) => {
    if (e.key === "Enter") {
      handleSendInputMessage();
    }
  };

  const handleSendInputMessage = () => {
    //check not to send empty data
    if (sendInput.length > 0) {
      sendMessage({
        receiverId: chosenChatDetails.id,
        content: sendInput,
      });

      setSendInput("");
    }
  };

  return (
    <div className="conversation-modal-wrapper">
      <div className="conversation-modal-header">
        <div className="profile-wrapper">
          <div className="picture-and-name-wrapper">
            <div className="picture-wrapper">
              <img className="profile-img" src={profileImage} />
            </div>
            <div className="chat-name-wrapper">{chosenChatDetails.name}</div>
          </div>
        </div>
      </div>
      <Messages/>
      <div className="text-input-container">
        <input
          className="text-send-input"
          type="text"
          id="send-input"
          onChange={handleSendInputChange}
          onKeyDown={handleSendInputEnter}
          value={sendInput}
          required
          placeholder="Write a message"
        />
        <img
          className="send-input-message"
          src={sendIcon}
          onClick={handleSendInputMessage}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps)(ConversationModal);
