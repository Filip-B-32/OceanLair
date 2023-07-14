const jwt = require("jsonwebtoken");
const config = process.env;
const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    socket.user = decoded;
  } catch (error) {
    const errorSocket = new Error("NOT_AUTHORIZED");
    return next(errorSocket);
  }

  next();
};

module.exports = verifyTokenSocket;