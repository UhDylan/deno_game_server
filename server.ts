import { Server } from "https://deno.land/x/socket_io@0.2.1/mod.ts";

const io = new Server();

console.log(`Socket.IO server listening on port ${port}`);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("modelAdded", (message) => {
    console.log("Server received modelAdded:", message);

    // Access io.sockets.sockets safely after the connection is established
    if (io.sockets) {
      // Check if io.sockets exists
      console.log("Connected clients:", Array.from(io.sockets.sockets.keys()));
      io.emit("modelAdded", message); // Use io.emit to broadcast to all clients
      console.log("Server broadcasted modelAdded:", message);
    } else {
      console.error("io.sockets is undefined. Cannot log connected clients.");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

Deno.serve({
  handler: io.handler(),
  port: 3000,
});
