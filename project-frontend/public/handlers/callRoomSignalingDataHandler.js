const callRoomSignalingDataHandler = (socket, data) => {
  const { connUserSocketId, signal } = data;
  const singalingData = { signal, connUserSocketId: socket.id };

  socket.to(connUserSocketId).emit("signal-connection", singalingData);
};

module.exports = callRoomSignalingDataHandler;
