const authorizationSocket = require("../middleware/tokenCheckSocketEvents");
const connectionHandler = require("../handlers/connectionHandler");
const disconnectHandler = require("../handlers/disconnectHandler");
const messageHandler = require("../handlers/messageHandler");
const chatHistoryHandler = require("../handlers/chatHistoryHandler");
const callRoomCreateHandler = require("../handlers/callRoomCreateHandler");
const callRoomJoinHandler = require("../handlers/callRoomJoinHandler");
const callRoomExitHandler = require("../handlers/callRoomExitHandler");
const callRoomInitializeConnectionHandler = require("../handlers/callRoomInitializeConnectionHandler");
const callRoomSignalingDataHandler = require("../handlers/callRoomSignalingDataHandler");
const store = require("../store");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  store.setSocketServerInstance(io);

  io.use((socket, next) => {
    authorizationSocket(socket, next);
  });

  const emitOnlinedUsers = () => {
    const onlineUsers = store.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);
    connectionHandler(socket, io);
    emitOnlinedUsers();

    socket.on("message", (data) => {
      messageHandler(socket, data);
    });

    socket.on("chat-history", (data) => {
      chatHistoryHandler(socket, data);
    });

    socket.on("create-call-room", () => {
      callRoomCreateHandler(socket);
    });

    socket.on("room-call-join", (data) => {
      callRoomJoinHandler(socket, data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });

    socket.on("exit-call-room", (data) => {
      callRoomExitHandler(socket, data);
    });

    socket.on("initialize-connection", (data) => {
      callRoomInitializeConnectionHandler(socket, data);
    });

    socket.on("signal-connection", (data) => {
      callRoomSignalingDataHandler(socket, data);
    });
  });

  setInterval(() => {
    emitOnlinedUsers();
  }, [8000]);
};

module.exports = {
  registerSocketServer,
};
