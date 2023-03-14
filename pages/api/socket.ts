import { Server } from "socket.io";

export default function handler(req: any, res: any) {
  const io = new Server(req.socket.server);

  res.socket.server.io = io;

  io.on("connection", (socket: any) => {
    socket.on("send-message", (obj: any) => {
      io.emit("receive-message", obj);
    });
  });

  console.log("Established connection");
  res.end();
}
