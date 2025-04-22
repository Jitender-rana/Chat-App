
"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}: {
    messages: {message: string}[];
    id: string
}) {
    const [chats, setChats] = useState(messages);
    const [currentMessage, setCurrentMessage] = useState("");
    const {socket, loading} = useSocket();

    useEffect(() => {
        if (socket && !loading) {

            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setChats(c => [...c, {message: parsedData.message}])
                }
            }
        }
    }, [socket, loading, id])

    return <div className="bg-black h-screen">
        <div className="h-52 flex flex-col">
            {chats.map(m => <span className="bg-white">{m.message}</span>)}
        </div>
        <div className="flex gap-6 ">

                <input  placeholder="chats"className="bg-white rounded p-2" type="text" value={currentMessage} onChange={e => {
                    setCurrentMessage(e.target.value);
                }}></input>
                <button className="bg-blue-500 rounded p-2 cursor-pointer"onClick={() => {
                    socket?.send(JSON.stringify({
                        type: "chat",
                        roomId: id,
                        message: currentMessage
                    }))

                    setCurrentMessage("");
                }}>Send message</button>
        </div>
    </div>
}