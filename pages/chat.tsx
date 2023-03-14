import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket: any;

export default function Chat() {
  let [name, setName] = useState("");
  let [message, setMessage] = useState<Array<string>>([]);

  const socketInitializer = useCallback(async () => {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data: any) => {
      console.log(data);
      setMessage((prev: any) => [...prev, data]);
    });
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();

    socket.emit("send-message", {
      name: name,
    });
  }

  useEffect(() => {
    console.log("Call");
    socketInitializer();
  }, [socketInitializer]);

  return (
    <>
      <h1>Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          aria-label="name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {/* {message.map((m) => (
        <p key={m}>{m}</p>
      ))} */}
    </>
  );
}
