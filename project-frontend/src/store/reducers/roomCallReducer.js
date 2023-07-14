import { roomCallActions } from "../actions/roomCallActions";

const roomsCallState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomCallDetails: null,
  activeCallRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  isUserJoinedWithAudioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
};

const reducer = (state = roomsCallState, action) => {
  switch (action.type) {
    case roomCallActions.OPEN_CALL_ROOM:
      return {
        ...state,
        isUserRoomCreator: action.isUserRoomCreator,
        isUserInRoom: action.isUserInRoom,
      };
    case roomCallActions.SET_CALL_ROOM_DETAILS:
      return {
        ...state,
        roomCallDetails: action.roomCallDetails,
      };
    case roomCallActions.SET_CALL_ROOM_ACTIVE:
      return {
        ...state,
        activeCallRooms: action.activeCallRooms,
      };
    case roomCallActions.SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream,
      };
    case roomCallActions.SET_AUDIO_ONLY:
      return {
        ...state,
        audioOnly: action.audioOnly,
      };
    case roomCallActions.SET_REMOTE_STREAMS:
      return {
        ...state,
        remoteStreams: action.remoteStreams,
      };
    case roomCallActions.SET_SCREEN_SHARE_STREAM:
      return {
        ...state,
        isScreenSharingActive: action.isScreenSharingActive,
        screenSharingStream: action.screenSharingStream,
      };
    case roomCallActions.SET_IS_USER_JOINED_AUDIO_ONLY:
      return {
        ...state,
        isUserJoinedWithAudioOnly: action.isUserJoinedWithAudioOnly,
      };
    default:
      return state;
  }
};

export default reducer;
