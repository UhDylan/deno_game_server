import { Server } from "https://deno.land/x/socket_io@0.2.1/mod.ts";

const io = new Server();

const port = 3000;

console.log(`Socket.IO server listening on port ${port}`);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("modelAdded", (message) => {
    console.log("Server received modelAdded:", message);

    // Access io.of("/").sockets *inside* the modelAdded handler:
    logConnectedClients(io); // Call the helper function
    io.emit("modelAdded", message);
    console.log("Server broadcasted modelAdded:", message);
  });

  socket.on("deleteModel", (modelName) => {
    console.log(`Client ${socket.id} deleting model: ${modelName}`);
    io.emit("modelDeleted", modelName);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

function logConnectedClients(io: Server) {
  if (io.of("/").sockets) {
    // Check if sockets exist
    console.log("Connected clients:", Array.from(io.of("/").sockets.keys()));
  } else {
    console.log("No clients connected yet."); // Log if no clients connected
  }
}

console.log(
  "Initial connected clients (likely empty):",
  Array.from(io.of("/").sockets.keys()),
);

Deno.serve({
  handler: io.handler(),
  port: 3000,
});
