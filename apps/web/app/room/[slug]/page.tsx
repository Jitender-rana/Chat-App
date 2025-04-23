import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";

async function getRoomId(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/get-room/${slug}`)
    console.log(`The returned response is: ${response.data.room}`);
    console.log(`The returned response id is: ${response.data.room.id}`);
    return response.data.room.id;
}

export default async function ChatRoom1({
    params
}: {
    params: Promise<{
        slug: string
    }>
}) {
    const {slug}=await params;
    const roomId =await getRoomId(slug);
    
    return <ChatRoom id={roomId}></ChatRoom>

}