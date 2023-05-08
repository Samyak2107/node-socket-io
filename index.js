const webSocketServerPort = 7000;
const { WebSocketServer } = require("ws");
const http = require("http");

const server = http.createServer();
server.listen(webSocketServerPort, () => {
  console.log(`WebSocket server is running on port ${webSocketServerPort}`);
});

const wsServer = new WebSocketServer({ server });

const clients = {};

// A new client connection request received
wsServer.on("connection", function (connection) {
  // Generate a unique code for every user
  const userId = uuidv4();
  console.log(`Recieved a new connection.`);

  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);

  function broadcastMessage(json) {
    // We are sending the current data to all connected active clients
    const data = JSON.stringify(json);
    for (let userId in clients) {
      let client = clients[userId];
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  }

  function handleDisconnect(userId) {
    console.log(`${userId} disconnected.`);
    const json = { type: typesDef.USER_EVENT };
    const username = users[userId]?.username || userId;
    userActivity.push(`${username} left the document`);
    json.data = { users, userActivity };
    delete clients[userId];
    delete users[userId];
    broadcastMessage(json);
  }

  // User disconnected
  connection.on("close", () => handleDisconnect(userId));
});
