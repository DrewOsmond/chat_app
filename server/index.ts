import { Server } from "socket.io";
//@ts-ignore
import eiows from "eiows";

const io = new Server(8040, {
  wsEngine: eiows.Server,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.listen(4000);

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.emit("msg", msg);
    socket.broadcast.emit("msg", msg);
  });
});
