import React from "react";
import roomCallImage from "../../icons/icons-activecall.png";
import { connect } from "react-redux";
import * as roomCallHandler from "../../communication/roomCallHandler";
import "./active-call-rooms-wrapper.css";

const ActiveCallRoomsWrapper = ({ activeCallRooms }) => {
  return (
    <div className="call-rooms-wrapper">
      {activeCallRooms.map((callRoom) => {
        const disabled = callRoom.participants.length > 3;
        const title = `Call Room made by ${callRoom.creatorName}`;
        const callRoomFull = disabled ? "Full" : "";

        const handleJoinCall = () => {
          if (callRoom.participants.length < 4) {
            roomCallHandler.joinRoomCall(callRoom.callRoomId);
            console.log(callRoom.isUserInRoom);
          }
        };

        return (
          <div
            className={`active-call-room-container ${
              callRoomFull === "" && "active-room"
            }`}
            onClick={() => {
              if (!disabled) {
                handleJoinCall();
              }
            }}
          >
            <div className="room-call-image">
              <img className="room-call-icon" src={roomCallImage} />
            </div>
            <div className="room-call-title">{title}</div>
            <div className="room-call-full-info">{callRoomFull}</div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ roomCall }) => {
  return {
    ...roomCall,
  };
};

export default connect(mapStateToProps)(ActiveCallRoomsWrapper);
