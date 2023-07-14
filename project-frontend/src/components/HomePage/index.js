import React, { useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import UserPicture from "../common/UserPicture";
import PageModal from "../common/PageModal";
import profileImage from "../../icons/profile-image.jpg";
import friendsList from "../../icons/icon-friends-list.png";
import friendInvitationIcon from "../../icons/friend-invitation.png";
import callFriends from "../../icons/icons-call.png";
import homeIcon from "../../icons/icons-home.png";
import addFriendImage from "../../icons/add-friend.png";
import { useWindowSize } from "../../libs/hooks";
import { validateMail } from "../../utils/validators";
import "./home-page.css";
import logoutButton from "../../icons/icons-logout.png";
import ProfileModal from "../ProfileModal";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import PendingInvitationsList from "../PendingInvitationsList/index";
import { logout } from "../../utils/auth";
import { connectionWithSocketServer } from "../../communication/socket";
import { getFriendsListActions } from "../../store/actions/friendsListActions";
import { sendFriendInvitation } from "../../api";
import { getChatActions } from "../../store/actions/chatActions";
import ConversationModal from "../ConversationModal";
import CallModal from "../CallModal";
import CallRoom from "../CallRoom";

const HomePage = ({
  setUserDetails,
  incomingInvitations,
  friends,
  onlineUsers,
  setChosenChatDetails,
  chosenChatDetails,
  isUserInRoom,
  errorMessageContent,
}) => {
  const isMobile = useWindowSize()[0] <= 768;
  const [maxFriendsLength, setMaxFriendsLength] = useState(15);
  const [width, setWidth] = useState(window.innerWidth);
  const [friendMail, setFriendMail] = useState("");
  const [isFormValid, setIsFormValid] = useState("");
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showFriendsInvitation, setShowFriendsInvitation] = useState(false);
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(errorMessageContent);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width <= 1297 && width > 901) {
      setMaxFriendsLength(10);
    } else if (width <= 901 && width > 505) {
      setMaxFriendsLength(5);
    } else if (width <= 505) {
      setMaxFriendsLength(1);
    } else {
      setMaxFriendsLength(15);
    }
  }, [width]);

  useEffect(() => {
    setIsFormValid(validateMail(friendMail));
  }, [friendMail, setIsFormValid]);

  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectionWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  const closeModal = () => {
    setShowFriendsList(false);
    setShowAddFriendsModal(false);
    setShowProfilePage(false);
    setShowFriendsInvitation(false);
    setShowCallModal(false);
    setErrorMessage(null);
  };

  const handleSendInvitation = async () => {
    try {
      await sendFriendInvitation({ friendMail: friendMail });
    } catch (exception) {
      setErrorMessage(exception.response.data);
      console.log("error :",exception.response.data);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const checkOnlineFriends = (friends = [], onlineUsers = []) => {
    friends.forEach((friend) => {
      const isFriendOnline = onlineUsers.find(
        (user) => user.userId === friend.id
      );
      friend.isOnline = isFriendOnline ? true : false;
    });

    return friends;
  };

  const handleConversation = (id, name) => {
    setChosenChatDetails({ id: id, name: name });
    setShowConversationModal(true);
  };

  return (
    <div className="home-page-wrapper">
      <div className="home-page-content">
        <div className="home-page-content-header">
          {!isMobile ? (
            <>
              <UserPicture
                src={profileImage}
                onClick={() => setShowProfilePage(true)}
              />
              <div className="header-right-side-wrapper">
                <div className="home-wrapper">
                  <img
                    className="home-icon"
                    src={homeIcon}
                    onClick={() => setShowConversationModal(false)}
                  />
                </div>
                <div className="invitation-wrapper">
                  <img
                    className="invitation-icon"
                    src={friendInvitationIcon}
                    onClick={() => setShowFriendsInvitation(true)}
                  />
                </div>
                <div className="logout-wrapper">
                  <img
                    className="logout-icon"
                    src={logoutButton}
                    onClick={handleLogout}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="responsive-header">
              <Menu>
                <div
                  className="menu-item"
                  onClick={() => setShowConversationModal(false)}
                >
                  Home
                </div>
                <div
                  className="menu-item"
                  onClick={() => setShowProfilePage(true)}
                >
                  Profile
                </div>
                <div
                  className="menu-item"
                  onClick={() => setShowFriendsInvitation(true)}
                >
                  Friend requests
                </div>
                <div className="menu-item" onClick={handleLogout}>
                  Logout
                </div>
              </Menu>
            </div>
          )}
        </div>
        <div className="home-page-content-wrapper">
          {showConversationModal ? (
            <ConversationModal chosenChatDetails={chosenChatDetails} />
          ) : (
            <>
              <div className="title">Welcome to OceanLair</div>
              <div className="subtitle">
                Welcome to the new age of Real-Time Communication
              </div>
            </>
          )}
        </div>
      </div>
      <div className="home-page-footer">
        <div className="friend-list-wrapper">
          {checkOnlineFriends(friends, onlineUsers)
            .slice(0, maxFriendsLength - 1)
            .map((friend) => (
              <UserPicture
                className="user-picture"
                src={profileImage}
                name={friend.name}
                isOnline={friend.isOnline}
                onClick={() => handleConversation(friend.id, friend.name)}
              />
            ))}
        </div>

        <div
          className="view-friends-list-button"
          onClick={() => setShowFriendsList(true)}
        >
          <img className="friends-list-icon" src={friendsList} />
        </div>

        <div
          className="call-friends-button"
          onClick={() => setShowCallModal(true)}
        >
          <img className="call-friends-icon" src={callFriends} />
        </div>

        <div
          className="add-new-friends-button"
          onClick={() => setShowAddFriendsModal(true)}
        >
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
      {showFriendsList && (
        <PageModal onToggle={closeModal} title={"Friends list"}>
          {friends.map((friend) => (
            <div
              className="friend-profile-wrapper"
              onClick={() => {
                handleConversation(friend.id, friend.name);
                closeModal();
              }}
            >
              <img className="friend-profile-image" src={profileImage} />
              <div className="friend-info">
                <div className="friend-profile-name">{friend.name}</div>
                <div
                  className={`friend-status ${
                    friend.isOnline ? "online" : "offline"
                  }`}
                >
                  {friend.isOnline ? "online" : "offline"}
                </div>
              </div>
            </div>
          ))}
        </PageModal>
      )}
      {showAddFriendsModal && (
        <PageModal onToggle={closeModal} title={"Add new friends"}>
          <div className="add-friend-email-wrapper">
            <div className="add-friend-text">
              Enter the person's email to request their friendship
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <div className="textbox email-add-friends">
              <input
                type="email"
                id="friend-mail"
                required
                placeholder="Mail"
                value={friendMail}
                onChange={(e) => setFriendMail(e.target.value)}
              />
              <span className="material-symbols-outlined"> email </span>
            </div>
            <button
              onClick={handleSendInvitation}
              className={`${!isFormValid && "disabled-add-button"}`}
              disabled={!isFormValid}
            >
              Add Friend
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <img className="add-friend-image" src={addFriendImage} />
          </div>
        </PageModal>
      )}
      {showFriendsInvitation && (
        <PendingInvitationsList
          onToggle={closeModal}
          title={"Friend requests"}
          incomingInvitations={incomingInvitations}
        />
      )}
      {showProfilePage && (
        <ProfileModal onToggle={closeModal} profileImage={profileImage} />
      )}
      {showCallModal && <CallModal onToggle={closeModal} />}
      {isUserInRoom && <CallRoom />}
    </div>
  );
};

const mapStateToProps = ({ friends, chat, roomCall, error }) => {
  return {
    ...friends,
    ...chat,
    ...roomCall,
    ...error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
    ...getFriendsListActions(dispatch),
    ...getChatActions(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
