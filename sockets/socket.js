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

export const sendMessageToCustomer = (client, io) => {
  console.log("sendMessageToCustomer triggered");
  client.on("send-message", (payload) => {
    io.emit(payload);
    console.log("Payload for message", payload);
    User.addMessage(payload);
    io.emit("message-received", User.getMessage());
  });
};

export const startVcip = (client, io) => {
  console.log("startVcip triggered");
  client.on("start-vcip", (payload) => {
    io.emit(payload);
    console.log("Payload for startVcip", payload);
    User.vcipStart(payload);
    io.emit("start-vcip-signal", User.getVcipSignal());
  });
};

export const agentSubscription = (client, io) => {
  console.log("agentSubscription triggered");
  client.on("agent-online", (payload) => {
    io.emit(payload);
    console.log("Payload for agentSubscription", payload);
    User.setAgentOnline(payload);
    io.emit("agent-online-signal", User.getIsAgentOnline());
  });
};

export const sendLivelinessCode = (client, io) => {
  console.log("Liveliness code sent");
  client.on("send-liveliness-code", (payload) => {
    io.emit(payload);
    console.log("Payload for liveliness code", payload);
    User.addLivelinessCode(payload);
    io.emit("liveliness-code-received", User.getLivelinessCode());
  });
};

export const sendCustomerIp = (client, io) => {
  console.log("Customer ip func triggered");
  client.on("send-customer-ip", (payload) => {
    io.emit(payload);
    console.log("Payload for customer ip", payload);
    User.addCustomerIp(payload);
    io.emit("customer-ip-received", User.getCustomerIp());
  });
};

export const removeUserOnline = (client, io) => {
  client.on("exit", () => {
    User.removeUser(client.id);
    io.emit("users-online", User.getUserList());
  });
};
