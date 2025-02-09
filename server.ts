import { Server } from "https://deno.land/x/socket_io@0.2.1/mod.ts";

const io = new Server();

const port = 3000;

console.log(`Socket.IO server listening on port ${port}`);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("modelAdded", (message) => {
    console.log("Server received modelAdded:", message);

    // Access io.sockets.sockets HERE, after a connection:
    console.log("Connected clients:", Array.from(io.sockets.sockets.keys()));
    io.emit("modelAdded", message);
    console.log("Server broadcasted modelAdded:", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

Deno.serve({
  handler: io.handler(),
  port: 3000,
});
