import React, { useEffect } from "react";
import closeButton from "../../icons/close-button.png";
import acceptButton from "../../icons/icons-check.png";
import rejectButton from "../../icons/icons-x.png";
import profileImage from "../../icons/profile-image.jpg";
import { connect } from "react-redux";
import { getFriendsListActions } from "../../store/actions/friendsListActions";
import { acceptInvitation, rejectInvitation } from "../../api";
import "./pending-invitations-list.css";

const PendingInvitationsList = (props) => {
  const closeModal = () => {
    props.onToggle();
  };

  return (
    <div className="invitations-page-modal-wrapper">
      <div className="invitations-page-modal-overflow" onClick={closeModal} />
      <div className="invitations-page-modal">
        <div className="invitations-page-header">
          <div className="invitations-page-title">{props.title}</div>
          <div className="invitations-page-header-content">
            <div className="invitations-page-close">
              <img
                className="close-button"
                src={closeButton}
                onClick={closeModal}
              />
            </div>
          </div>
        </div>
        <div className="invitations-page-content">
          {props.incomingInvitations.map((invitation) => (
            <div key={invitation._id} className="list-element-wrapper">
              <div className="profile-wrapper-invitations">
                <img
                  className="profile-image-invitations"
                  src={profileImage}
                />
                <div className="profile-name-invitations">{invitation.senderId.name}</div>
              </div>
              <div className="buttons-wrapper-invitations">
                <img
                  className="accept-button"
                  src={acceptButton}
                  onClick={() => {
                    acceptInvitation({ id: invitation._id });
                  }}
                />
                <img
                  className="reject-button"
                  src={rejectButton}
                  onClick={() => {
                    rejectInvitation({ id: invitation._id });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getFriendsListActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(PendingInvitationsList);
