import React, { useEffect, useState } from "react";
import PageModal from "../common/PageModal";
import HandleAudioOnlyChangeButton from "./HandleAudioOnlyChangeButton";
import "./profile-modal.css";

const ProfileModal = (props) => {
  const { onToggle } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    const parsedUser = JSON.parse(userDetails);
    setUser(parsedUser);
  }, []);

  return (
    <>
      <PageModal
        className="profile-page-wrapper"
        onToggle={() => onToggle()}
        title={"Profile page"}
      >
        <div className="profile-page-picture-wrapper">
          <div className="profile-page-picture-content">
            <img className="profile-picture-image" src={props.profileImage} />
          </div>
        </div>
        <div className="data-wrapper">
          <div className="name-wrapper">
            <div className="name-value">{user.name}</div>
          </div>
          <div className="email-wrapper">
            <div className="email-title">Email:</div>
            <div className="email-value">{user.mail}</div>
          </div>
          <HandleAudioOnlyChangeButton/>
        </div>
      </PageModal>
    </>
  );
};

export default ProfileModal;
