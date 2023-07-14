const store = require("../store");
const update = require("../handlers/updatesHandler");

const callRoomJoinHandler = (socket, data) => {
  const { callRoomId } = data;

  const participantDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const callRoomDetails = store.getActiveCallRoom(callRoomId);
  store.joinActiveCallRoom(callRoomId, participantDetails);

  //sending information to users => preparing for incoming call
  callRoomDetails.participants.forEach((participant) => {
    //not emit the data to ourself
    if (participant.socketId !== participantDetails.socketId) {
      socket.to(participant.socketId).emit("prepare-connection", {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  update.updateCallRooms();
};

module.exports = callRoomJoinHandler;
