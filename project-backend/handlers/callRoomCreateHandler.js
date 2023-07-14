const store = require("../store");
const update = require("../handlers/updatesHandler");

const callRoomCreateHandler = (socket) => {
  console.log("create call room event");
  const socketId = socket.id;
  const userId = socket.user.userId;

  const callRoomDetails = store.addnewActiveCallRoom(userId, socketId);

  //emit information about the call room
  socket.emit("create-call-room", {
    callRoomDetails,
  });

  update.updateCallRooms();
};

module.exports = callRoomCreateHandler;
