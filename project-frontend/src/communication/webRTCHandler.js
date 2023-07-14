import store from "../store/store";
import {
  setLocalStream,
  setRemoteStreams,
} from "../store/actions/roomCallActions";
import {
  showErrorMessage,
  resetErrorMessage,
} from "../store/actions/errorActions";
import * as socket from "./socket";
import Peer from "simple-peer";

let peers = {};

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};

const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    //using turn server credentials
  } else {
    console.warn("Using only stun server");
    return {
      iceServer: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(resetErrorMessage());
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((error) => {
      console.log(error);
      store.dispatch(showErrorMessage("Cannot get an access to local stream"));
    });
};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().roomCall.localStream;

  if (isInitiator) {
    console.log("preparing peer conn as initiator");
  } else {
    console.log("preparing peer conn not as initiator");
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  //event listeners -> establish direct connection
  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    socket.signalPeerData(signalData);
  });

  //if connection established -> get the other participants stream
  peers[connUserSocketId].on("stream", (remoteStream) => {
    //add new remote stream to store
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

//add to store
const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().roomCall.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];

    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId]; // delete object
    }
  });
};

export const participantLeftHandler = (data) => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId]; // delete object
  }

  //remove remote stream
  const remoteStreams = store.getState().roomCall.remoteStreams;
  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const switchOutgoingTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
