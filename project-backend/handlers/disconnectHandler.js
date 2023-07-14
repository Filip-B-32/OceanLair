const store = require("../store");
const callRoomExitHandler = require("./callRoomExitHandler");

const disconnectHandler = (socket) => {
  const activeCallRooms = store.getActiveCallRooms();

  activeCallRooms.forEach((activeCallRoom) => {
    const userInCall = activeCallRoom.participants.some(
      (participant) => participant.socketId === socket.id
    );

    if (userInCall) {
      callRoomExitHandler(socket, { callRoomId: activeCallRoom.callRoomId });
    }
  });

  store.disconnectUser(socket.id);
};

module.exports = disconnectHandler;
