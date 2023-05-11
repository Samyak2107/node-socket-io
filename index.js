import express from "express";
import http from "http";
import { Server } from "socket.io";
import socket from "./sockets/socket.js";
import { User } from "./user.js";

const PORT = 5000;
const app = express();
const httpServer = new http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (client) => {
  io.emit("users-online", User.getUserList());

  socket.disconnectClient(client, io);
  socket.addUserOnline(client, io);
  socket.removeUserOnline(client, io);
});

httpServer.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
