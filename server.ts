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
});

Deno.serve({
  handler: io.handler(),
  port: 3000,
});
