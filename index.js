import express from "express";
import http from "http";
import { Server } from "socket.io";
import * as socket from "./sockets/socket.js";
import { User } from "./user.js";

const PORT = 5000;
const app = express();
const httpServer = new http.Server(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://st.jiovcip.jiolabs.com:443",
      "https://st.jiovcip.jiolabs.com:4200",
      "https://st.jiovcip.jiolabs.com:4201",
      "https://st.jiovcip.jiolabs.com:4203",
      "https://st.jiovcip.jiolabs.com",
      "https://dev.jiovcip.jiolabs.com",
      "https://dev.jiovcip.jiolabs.com:443",
      "https://dev.jiovcip.jiolabs.com:4200",
      "https://dev.jiovcip.jiolabs.com:4201",
      "https://dev.jiovcip.jiolabs.com:4203",
    ],
  },
});

io.on("connection", (client) => {
  console.log("A User connected!");
  io.emit("users-online", User.getUserList());
  socket.sendMessageToCustomer(client, io);
  socket.startVcip(client, io);
  socket.agentSubscription(client, io);
  socket.sendLivelinessCode(client, io);
  socket.sendCustomerIp(client, io);
  socket.disconnectClient(client, io);
  socket.addUserOnline(client, io);
  socket.removeUserOnline(client, io);
});

httpServer.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
