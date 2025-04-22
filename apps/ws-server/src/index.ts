import { WebSocketServer, WebSocket } from 'ws';
import  JWT_SECRET  from '@repo/common-backend/config';
import jwt from 'jsonwebtoken';
import { prismaClient } from '@repo/db-package/client';



const wss = new WebSocketServer({ port: 8090 });
interface user{
  userId: string,
  rooms: string[],
  ws: WebSocket
}
const users:user[]=[];

function checkUser(token: string): string | null{
  try{
    const decoded=jwt.verify(token,JWT_SECRET);
    if(typeof decoded=='string'){
      return null;
    }
    if(!decoded || !decoded.userId){
      return null;

    }
    return decoded.userId;

  }catch(error){
    return null;

  }

}

wss.on('connection', function connection(ws,req) {
  const url=req.url;
  if(!url){
    return;
  }
  const queryParams =new URLSearchParams(url.split('?')[1]);
  const token=queryParams.get('token')|| " ";
  const userId=checkUser(token);
  if(userId==null){
    ws.close();
    return;
  }
  users.push({
    userId,
    rooms: [],
    ws
  })
  ws.on('message',async function message(data){
    let parsedData;
    if(typeof data!=='string'){
      parsedData=JSON.parse(data.toString());
    }else{
      parsedData=JSON.parse(data);
    }
    if(parsedData.type==="join_room"){
      const user=users.find(x=>x.ws==ws);
      user?.rooms.push(parsedData.roomId);
      
    }
    if(parsedData.type==="leave_room"){
      const user=users.find(user=>user.ws===ws);
      if(!user){
        return;
      }
      user.rooms=user?.rooms.filter(x=>x!==parsedData.room);

    }
    console.log("message received");
    

    if(parsedData.type==="chat"){
      const roomId=parsedData.roomId;
      const message=parsedData.message;
      await prismaClient.chat.create({
        data:{
          roomId: roomId,
          message,
          userId,

        }
      })
      users.forEach(user=>{
        if(user.rooms.includes(roomId)){
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId,

          }))

        }
      })
    }




  });



  
});