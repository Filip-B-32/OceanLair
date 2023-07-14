export const roomCallActions = {
  OPEN_CALL_ROOM: "CALL_ROOM.OPEN_CALL_ROOM",
  SET_CALL_ROOM_DETAILS: "CALL_ROOM.SET_CALL_ROOM_DETAILS",
  SET_CALL_ROOM_ACTIVE: "CALL_ROOM.SET_CALL_ROOM_ACTIVE",
  SET_LOCAL_STREAM: "CALL_ROOM.SET_LOCAL_STREAM",
  SET_REMOTE_STREAMS: "CALL_ROOM.SET_REMOTE_STREAMS",
  SET_AUDIO_ONLY: "CALL_ROOM.SET_AUDIO_ONLY",
  SET_SCREEN_SHARE_STREAM: "CALL_ROOM.SET_SCREEN_SHARE_STREAM",
  SET_IS_USER_JOINED_AUDIO_ONLY: "CALL_ROOM.SET_IS_USER_JOINED_AUDIO_ONLY",
};

export const getCallActions = (dispatch) => {
  return {
    setAudioOnly: (audioOnly) => dispatch(setAudioOnly(audioOnly)),
    setScreenSharingStream: (stream) =>
      dispatch(setScreenSharingStream(stream)),
  };
};

export const setOpenRoomCall = (
  isUserRoomCreator = false,
  isUserInRoom = false
) => {
  return {
    type: roomCallActions.OPEN_CALL_ROOM,
    isUserRoomCreator: isUserRoomCreator,
    isUserInRoom,
  };
};

export const setRoomCallDetails = (roomCallDetails) => {
  return {
    type: roomCallActions.SET_CALL_ROOM_DETAILS,
    roomCallDetails,
  };
};

export const setActiveCallRooms = (activeCallRooms) => {
  return {
    type: roomCallActions.SET_CALL_ROOM_ACTIVE,
    activeCallRooms,
  };
};

export const setLocalStream = (localStream) => {
  return {
    type: roomCallActions.SET_LOCAL_STREAM,
    localStream,
  };
};

export const setAudioOnly = (audioOnly) => {
  return {
    type: roomCallActions.SET_AUDIO_ONLY,
    audioOnly,
  };
};

export const setRemoteStreams = (remoteStreams) => {
  return {
    type: roomCallActions.SET_REMOTE_STREAMS,
    remoteStreams,
  };
};

export const setScreenSharingStream = (stream) => {
  return {
    type: roomCallActions.SET_SCREEN_SHARE_STREAM,
    isScreenSharingActive: stream ? true : false,
    screenSharingStream: stream || null,
  };
};

export const setIsUserJoinedWithAudioOnly = (audioOnly) => {
  return {
    type: roomCallActions.SET_IS_USER_JOINED_AUDIO_ONLY,
    isUserJoinedWithAudioOnly: audioOnly,
  };
};
