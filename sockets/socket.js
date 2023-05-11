// import socketIO, { Socket } from "socket.io";
import { User } from "../user.js";

export const disconnectClient = (client, io) => {
  client.on("disconnect", () => {
    User.removeUser(client.id);
    io.emit("users-online", User.getUserList());
  });
};

export const addUserOnline = (client, io) => {
  client.on("add-user", (payload) => {
    payload.id = client.id;
    User.addUser(payload);
    io.to(client.id).emit("user-id", client.id);
    io.emit("users-online", User.getUserList());
  });
};
export const removeUserOnline = (client, io) => {
  client.on("exit", () => {
    User.removeUser(client.id);
    io.emit("users-online", User.getUserList());
  });
};
