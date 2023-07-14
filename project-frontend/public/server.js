const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { compareSync } = require("bcryptjs");
require("dotenv").config();

const socketServer = require("./serverSocket/socket");
const authRoutes = require("./routes/authRoutes");
const friendInviteRoute = require("./routes/friendInviteRoute");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

//register the routes
app.use("/api/auth/", authRoutes);
app.use("/api/friend-invitation-list", friendInviteRoute);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed. Server not started");
    console.error(error);
  });
