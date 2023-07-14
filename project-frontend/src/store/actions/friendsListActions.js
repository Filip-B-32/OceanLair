import * as api from "../../api";
import { showErrorMessage, resetErrorMessage } from "./errorActions";

export const friendsListActions = {
  SET_FRIENDS: "FRIENDS.SET_FRIENDS",
  SET_INCOMING_FRIENDS_INVITATIONS: "FRIENDS.SET_INCOMING_FRIENDS_INVITATIONS",
  SET_ONLINE_USERS: "FRIENDS.SET_ONLINE_USERS",
};

export const getFriendsListActions = (dispatch) => {
  return {
    sendFriendInvitation: (data) => dispatch(sendFriendInvitation(data)),
    acceptInvitation: (data) => dispatch(acceptInvitation(data)),
    rejectInvitation: (data) => dispatch(rejectInvitation(data)),
  };
};

export const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendsListActions.SET_ONLINE_USERS,
    onlineUsers,
  };
};

export const setIncomingInvitationsList = (incomingInvitations) => {
  return {
    type: friendsListActions.SET_INCOMING_FRIENDS_INVITATIONS,
    incomingInvitations,
  };
};

export const setFriends = (friends) => {
  return {
    type: friendsListActions.SET_FRIENDS,
    friends,
  };
};

const sendFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.sendFriendInvitation(data);
    if (response.error) {
      dispatch(showErrorMessage(response?.exception?.response?.data));
    } else {
      dispatch(resetErrorMessage());
      console.log("invitation sent");
    }
  };
};

const acceptInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.acceptInvitation(data);
    if (response.error) {
      dispatch(showErrorMessage(response?.exception?.response?.data));
    } else {
      dispatch(resetErrorMessage());
      console.log("invitation accepted");
    }
  };
};

const rejectInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.rejectInvitation(data);
    if (response.error) {
      dispatch(showErrorMessage(response?.exception?.response?.data));
    } else {
      dispatch(resetErrorMessage());
      console.log("invitation rejected");
    }
  };
};
