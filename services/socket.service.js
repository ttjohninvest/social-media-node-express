const logger = require("./logger.service");

let gIo = null;

let connectedUsers = [];

function connectSockets(http, session) {
  gIo = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });
  gIo.on("connection", (socket) => {
    console.log("New socket", socket.id);

    socket.emit("add-connected-users", connectedUsers);

    socket.on("disconnect", (socket) => {
      console.log("Someone disconnected");
      connectedUsers = connectedUsers.filter((u) => u.userId !== socket.userId);
    });

    socket.on("setUserSocket", async (userId) => {
      socket.userId = userId;

      if (!connectedUsers.includes(userId)) connectedUsers.push(userId);
    });

    socket.on("post-updated", (post) => {
      socket.broadcast.emit("update-post", post);
    });
    socket.on("post-added", (post) => {
      socket.broadcast.emit("add-post", post);
    });
    socket.on("post-removed", (postId) => {
      socket.broadcast.emit("remove-post", postId);
    });

    socket.on("chat-updated", async (chat) => {
      const userSocket = await _getUserSocket(chat.userId);
      const userSocket2 = await _getUserSocket(chat.userId2);
      console.log({ userSocket2, userSocket });
      if (userSocket) {
        userSocket.emit("update-chat", chat);
      }
      if (userSocket2) {
        userSocket2.emit("update-chat", chat);
      }
    });
    socket.on("chat-added", (chat) => {
      socket.broadcast.emit("add-chat", chat);
    });

    socket.on("comment-updated", (comment) => {
      socket.broadcast.emit("update-comment", comment);
    });
    socket.on("comment-added", (comment) => {
      socket.broadcast.emit("add-comment", comment);
    });
    socket.on("comment-removed", (comment) => {
      socket.broadcast.emit("remove-comment", comment);
    });
  });
}

function emitTo({ type, data, label }) {
  if (label) gIo.to("watching:" + label).emit(type, data);
  else gIo.emit(type, data);
}

async function emitToUser({ type, data, userId }) {
  logger.debug("Emiting to user socket: " + userId);
  const socket = await _getUserSocket(userId);
  if (socket) socket.emit(type, data);
  else {
    console.log("User socket not found");
    _printSockets();
  }
}

async function broadcast({ type, data, room = null, userId }) {
  console.log("BROADCASTING", JSON.stringify(arguments));
  const excludedSocket = await _getUserSocket(userId);
  if (!excludedSocket) {
    return;
  }
  logger.debug("broadcast to all but user: ", userId);
  if (room) {
    excludedSocket.broadcast.to(room).emit(type, data);
  } else {
    excludedSocket.broadcast.emit(type, data);
  }
}

async function _getUserSocket(userId) {
  const sockets = await _getAllSockets();
  const socket = sockets.find((s) => s.userId == userId);
  return socket;
}
async function _getAllSockets() {
  const sockets = await gIo.fetchSockets();
  return sockets;
}

async function _printSockets() {
  const sockets = await _getAllSockets();
  console.log(`Sockets: (count: ${sockets.length}):`);
  sockets.forEach(_printSocket);
}
function _printSocket(socket) {
  console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`);
}

module.exports = {
  connectSockets,
  emitTo,
  emitToUser,
  broadcast,
};
