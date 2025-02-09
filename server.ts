import { Server } from "https://deno.land/x/socket_io@0.2.1/mod.ts";

const io = new Server();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("hello", "world");

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });

  socket.on("modelUpdate", (message) => {
    console.log("message:" + message);
    io.emit("modelUpdate", message);
  });

  socket.on("modelAdded", (message) => {
    console.log("Server received modelAdded:", message);
    console.log("Connected clients:", Array.from(io.sockets.sockets.keys())); // Log connected clients
    io.emit("modelAdded", message); // Or io.sockets.emit if you prefer
    console.log("Server broadcasted modelAdded:", message);
  });
});

Deno.serve({
  handler: io.handler(),
  port: 3000,
});
