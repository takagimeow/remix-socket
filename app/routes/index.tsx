import { useEffect, useRef, useState } from "react";
import { ActionFunction, Form } from "remix";
import io, { Socket } from "socket.io-client";

export default function Index() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<
    {
      id: string;
      roomId: string;
      message: string;
    }[]
  >([]);
  const messagesRef = useRef<{
      id: string;
      roomId: string;
      message: string;
    }[]>([]);
  useEffect(() => {
    const socket = io("/messages");
    setSocket(socket);
    socket.on("serverMsg", (msg) => {
      if (msg.id) {
        const filtered = messagesRef.current.filter((item) => item.id !== msg.id);
        messagesRef.current = [...filtered, msg];
        setMessages([...filtered, msg]);
      }
    });
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div
      className="px-8 py-8"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <h1 className="text-4xl font-bold text-slate-500">
        Welcome to Remix Socket
      </h1>
      {(messages).map((msg) => {
        return (
          <div key={msg.id} className="flex flex-row justify-between px-2 py-2">
            <label>{msg.id}</label>
            <span>{msg.message}</span>
          </div>
        );
      })}
      <Form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-2">
          <label className="text-xs font-bold text-slate-600 dark:text-white">
            メッセージ
          </label>
          <div>
            <input
              name="name"
              type="text"
              className="w-full px-2 py-2 bg-gray-100 dark:bg-gray-600 focus:bg-white dark:focus:bg-gray-700  mb-1 rounded-md border border-cyan-500 outline-none"
              placeholder="メッセージを入力してください"
              onChange={(e) => {
                e.preventDefault();
                socket?.emit("post", {
                  id: socket.id ?? "user-id-1",
                  roomId: "room-id-1",
                  message: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
