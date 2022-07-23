import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [chatBox, setChatBox] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ioSocket = io("http://localhost:8040");
    ioSocket.on("connect", () => {
      setSocket(ioSocket);
      setLoaded(true);
    });

    ioSocket.on("msg", (msg) => {
      setMessages((prev) => {
        return [...prev, msg];
      });
    });

    return () => void ioSocket.close();
  }, []);

  return (
    <>
      {!loaded && <div>loading...</div>}
      {loaded && socket?.emit && (
        <>
          <h1>Chat App :D</h1>
          <input
            type="text"
            value={chatBox}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setChatBox("");
                socket.emit("message", e.target.value);
              }
            }}
            onChange={(e) => setChatBox(e.target.value)}
          />
        </>
      )}
      {messages.map((ele, i) => (
        <div key={`text-${i}`}>{ele}</div>
      ))}
    </>
  );
}

export default App;
