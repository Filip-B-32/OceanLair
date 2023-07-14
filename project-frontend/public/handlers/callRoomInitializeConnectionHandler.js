const callRoomInitializeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;

  const initializeConnectionData = { connUserSocketId: socket.id };
  socket
    .to(connUserSocketId)
    .emit("initialize-connection", initializeConnectionData);
};

module.exports = callRoomInitializeConnectionHandler;
