const store = require("../store");
const update = require("../handlers/updatesHandler");

const connectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  store.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  update.updateInvitations(userDetails.userId);
  update.updateFriendsList(userDetails.userId);
  setTimeout(() => {
    update.updateCallRooms(socket.id);
  }, [500]);
};

module.exports = connectionHandler;
