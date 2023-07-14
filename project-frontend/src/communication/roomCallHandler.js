import {
  setOpenRoomCall,
  setRoomCallDetails,
  setActiveCallRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
  setIsUserJoinedWithAudioOnly,
} from "../store/actions/roomCallActions";
import store from "../store/store";
import * as socket from "./socket";
import * as webRTCHandler from "./webRTCHandler";

export const createNewCallRoom = () => {
  const successCallBackFunction = () => {
    store.dispatch(setOpenRoomCall(true, true));

    const audioOnly = store.getState().roomCall.audioOnly;
    store.dispatch(setIsUserJoinedWithAudioOnly(audioOnly));

    socket.createNewCallRoom();
  };

  const onlyAudio = store.getState().roomCall.audioOnly;
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCallBackFunction);
};

export const newCallRoomCreated = (data) => {
  const { callRoomDetails } = data;
  store.dispatch(setRoomCallDetails(callRoomDetails));
};

export const updateActiveCallRooms = (data) => {
  const { activeCallRooms } = data;

  const friends = store.getState().friends.friends;

  const callRooms = [];

  const userId = store.getState().auth.userDetails?._id;

  activeCallRooms.forEach((callRoom) => {
    const roomCreator = callRoom.callRoomCreator.userId;

    if (roomCreator === userId) {
      callRooms.push({ ...callRoom, creatorName: "You" });
    } else {
      friends.forEach((friend) => {
        if (friend.id === callRoom.callRoomCreator.userId) {
          callRooms.push({ ...callRoom, creatorName: friend.name });
        }
      });
    }
  });

  store.dispatch(setActiveCallRooms(callRooms));
};

export const joinRoomCall = (callRoomId) => {
  const successCallBackFunction = () => {
    store.dispatch(setRoomCallDetails({ callRoomId }));

    const audioOnly = store.getState().roomCall.audioOnly;
    store.dispatch(setIsUserJoinedWithAudioOnly(audioOnly));

    store.dispatch(setOpenRoomCall(false, true));
    socket.joinRoomCall({ callRoomId });
  };

  const onlyAudio = store.getState().roomCall.audioOnly;
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCallBackFunction);
};

export const exitRoomCall = () => {
  const callRoomId = store.getState().roomCall.roomCallDetails.callRoomId;

  const localStream = store.getState().roomCall.localStream;

  if (localStream) {
    //when we exit room call stop all video and audio
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  //stop sharing when we leave call
  const screenSharingStream = store.getState().roomCall.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }

  store.dispatch(setRemoteStreams([]));

  // close all connections so the user can leave propperly
  webRTCHandler.closeAllConnections();

  socket.exitRoomCall({ callRoomId });
  store.dispatch(setRoomCallDetails(null));
  store.dispatch(setOpenRoomCall(false, false));
};
