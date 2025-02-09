import { Server } from "https://deno.land/x/socket_io@0.2.1/mod.ts";

const io = new Server();

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.emit("hello", "world");

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });

  socket.on("modelUpdate", (message) => {
    console.log("message:" + message);
    io.emit("modelUpdate", message);
  });

  socket.on("modelAdded", (message) => {
    console.log("Server received modelAdded:", message); // Log when received
    io.emit("modelAdded", message); // Broadcast to all clients
    console.log("Server broadcasted modelAdded:", message); // Log when broadcasted
  });
});

Deno.serve({
  handler: io.handler(),
  port: 3000,
});
