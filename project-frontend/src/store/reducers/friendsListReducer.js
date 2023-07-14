import { friendsListActions } from "../actions/friendsListActions";

const friendsState = {
  friends: [],
  incomingInvitations: [],
  connected: [],
};

const friendsListReducer = (state = friendsState, action) => {
  switch (action.type) {
    case friendsListActions.SET_INCOMING_FRIENDS_INVITATIONS:
      return {
        ...state,
        incomingInvitations: action.incomingInvitations,
      };
    case friendsListActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case friendsListActions.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    default:
      return state;
  }
};

export default friendsListReducer;
