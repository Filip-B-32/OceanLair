import React from "react";
import "./user-picture.css";

const UserPicture = (props) => {
  const { src, name, onClick, isOnline } = props;

  const nameSelector = (name) => {
    if (name.length > 4) return name.slice(0, 4).concat("...");
    else return name;
  };

  return (
    <div
      className={`user-profile-wrapper ${props.className}`}
      onClick={() => onClick()}
    >
      {isOnline && <div className="active-circle"></div>}
      <img className="user-profile-image" src={src} />
      <div className="user-profile-name">{name ? nameSelector(name) : ""}</div>
    </div>
  );
};

export default UserPicture;
