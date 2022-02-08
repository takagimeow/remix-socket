import { useEffect, useRef, useState } from "react";
import { ActionFunction, Form } from "remix";
import io, { Socket } from "socket.io-client";
import { MessageField } from "~/components/MessageField";
import { TextField } from "~/components/TextField";

export default function Index() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<
    {
      id: string;
      roomId: string;
      message: string;
    }[]
  >([]);
  const messagesRef = useRef<
    {
      id: string;
      roomId: string;
      message: string;
    }[]
  >([]);
  useEffect(() => {
    const socket = io("/messages");
    setSocket(socket);
    socket.on("serverMsg", (msg) => {
      if (msg.id) {
        console.log("msg: ", msg);
        const filtered = messagesRef.current.filter(
          (item) => item.id !== msg.id
        );
        messagesRef.current = [...filtered, msg];
        setMessages([...filtered, msg]);
      } else {
        if (socket?.id) {
          // 相手との接続を確立させるために空文字列を送信する
          socket?.emit("post", {
            id: socket.id,
            roomId: "room-id-1",
            message: "",
          });
        }
      }
    });
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div
      className="flex flex-col h-screen"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <div className="flex justify-between h-full">
        <div className="h-full w-full relative">
          <TextField
            id={socket?.id ?? "user-id-i1"}
            onChange={(text) => {
              socket?.emit("post", {
                id: socket.id ?? "user-id-1",
                roomId: "room-id-1",
                message: text,
              });
            }}
          />
          <div className="absolute bottom-0 right-0">
            {socket?.id ?? "user-id-i1"}
          </div>
        </div>
        {messages.map((message) => {
          return message.id === socket?.id ? null : (
            <div className="h-full w-full relative">
              <MessageField id={message.id} text={message.message} />
              <div className="absolute bottom-0 right-0">{message.id}</div>
            </div>
          );
        })}
        {
          messages.length < 2 ? (
            <div className="h-full w-full relative">
              <MessageField id={"待機中"} text={""} />
              <div className="absolute bottom-0 right-0">{"待機中"}</div>
            </div>
          ) : null
        }
      </div>
    </div>
  );
}
