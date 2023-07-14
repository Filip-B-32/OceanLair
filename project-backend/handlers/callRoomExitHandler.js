const store = require("../store");
const update = require("../handlers/updatesHandler");

const callRoomExitHandler = (socket, data) => {
  const { callRoomId } = data;

  const activeCallRoom = store.getActiveCallRoom(callRoomId);

  if (activeCallRoom) {
    store.exitActiveRoom(callRoomId, socket.id);

    //check if room still exists
    const updatedActiveCallRoom = store.getActiveCallRoom(callRoomId);

    if (updatedActiveCallRoom) {
      updatedActiveCallRoom.participants.forEach((participant) => {
        socket.to(participant.socketId).emit("participant-left-call-room", {
          connUserSocketId: socket.id,
        });
      });
    }

    update.updateCallRooms();
  }
};

module.exports = callRoomExitHandler;
