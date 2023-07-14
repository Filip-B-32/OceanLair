import io from "socket.io-client";
import {
  setIncomingInvitationsList,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsListActions";
import { updateChatHistory } from "../utils/chat";
import * as roomCallHandler from "./roomCallHandler";
import * as webRTCHandler from "./webRTCHandler";
import store from "../store/store";

let socket = null;
let isConnected = false;

export const connectionWithSocketServer = (userDetails) => {
  const token = userDetails.token;

  socket = io("http://localhost:8080", {
    auth: {
      token: token,
    },
  });

  socket.on("connect", () => {
    isConnected = true;
    console.log("success with socket.io");
    console.log(socket.id);
  });

  socket.on("friends-invitation-list", (data) => {
    const { incomingInvitations } = data;

    store.dispatch(setIncomingInvitationsList(incomingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;

    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("chat-history", (data) => {
    updateChatHistory(data);
  });

  socket.on("create-call-room", (data) => {
    roomCallHandler.newCallRoomCreated(data);
  });

  socket.on("active-call-rooms", (data) => {
    roomCallHandler.updateActiveCallRooms(data);
  });

  socket.on("prepare-connection", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    socket.emit("initialize-connection", {
      connUserSocketId: connUserSocketId,
    });
  });

  socket.on("initialize-connection", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("signal-connection", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("participant-left-call-room", (data) => {
    console.log("user left room");
    webRTCHandler.participantLeftHandler(data);
  });
};

export const sendMessage = (data) => {
  if (isConnected) {
    socket.emit("message", data);
  }
};

export const receiveMessage = (data) => {
  if (isConnected) {
    socket.emit("chat-history", data);
  }
};

export const createNewCallRoom = () => {
  if (isConnected) {
    socket.emit("create-call-room");
  }
};

export const joinRoomCall = (data) => {
  if (isConnected) {
    socket.emit("room-call-join", data);
  }
};

export const exitRoomCall = (data) => {
  socket.emit("exit-call-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("signal-connection", data);
};
