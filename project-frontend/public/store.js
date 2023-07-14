const { v4: uuidv4 } = require("uuid");

const connectedUsers = new Map();

let io = null;
let activeCallRooms = [];

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log("new connected users");
  console.log(connectedUsers);
};

const disconnectUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("users:", connectedUsers);
  }
};

const getConnectedUsers = (userId) => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      onlineUsers.push(key);
    }
  });

  return onlineUsers;
};

const getOnlineUsers = () => {
  const online = [];
  connectedUsers.forEach((value, key) => {
    online.push({ socketId: key, userId: value.userId });
  });

  return online;
};

const addnewActiveCallRoom = (userId, socketId) => {
  const newActiveCallRoom = {
    callRoomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    callRoomId: uuidv4(),
  };

  activeCallRooms = [...activeCallRooms, newActiveCallRoom];

  console.log("active-call-rooms");
  console.log(activeCallRooms);
  return newActiveCallRoom;
};

const getActiveCallRooms = () => {
  return [...activeCallRooms];
};

const getActiveCallRoom = (callRoomId) => {
  const activeCallRoom = activeCallRooms.find(
    (activeCallRoom) => activeCallRoom.callRoomId === callRoomId
  );

  //we return the copy of the properties only when found
  if (activeCallRoom) {
    return {
      ...activeCallRoom,
    };
  } else {
    return null;
  }
};

const joinActiveCallRoom = (callRoomId, newParticipant) => {
  const callRoom = activeCallRooms.find(
    (callRoom) => callRoom.callRoomId === callRoomId
  );

  activeCallRooms = activeCallRooms.filter(
    (callRoom) => callRoom.callRoomId !== callRoomId
  );

  const updatedCallRoom = {
    ...callRoom,
    participants: [...callRoom.participants, newParticipant],
  };

  console.log("updated room");
  console.log(updatedCallRoom);

  activeCallRooms.push(updatedCallRoom);
};

const exitActiveRoom = (callRoomId, participantSocketId) => {
  const activeCallRoom = activeCallRooms.find(
    (callRoom) => callRoom.callRoomId === callRoomId
  );

  if (activeCallRoom) {
    const copyActiveRoom = { ...activeCallRoom };

    copyActiveRoom.participants = copyActiveRoom.participants.filter(
      (participant) => participant.socketId !== participantSocketId
    );

    activeCallRooms = activeCallRooms.filter(
      (callRoom) => callRoom.callRoomId !== callRoomId
    );

    if (copyActiveRoom.participants.length > 0) {
      activeCallRooms.push(copyActiveRoom);
    }
  }
};

module.exports = {
  addNewConnectedUser,
  disconnectUser,
  getConnectedUsers,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUsers,
  getActiveCallRooms,
  addnewActiveCallRoom,
  getActiveCallRoom,
  joinActiveCallRoom,
  exitActiveRoom,
};
