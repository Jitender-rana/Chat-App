import express ,{Request,Response, Router} from "express";
import { authenticatedRequest, authMiddleware } from "../middlewares/auth";
import { contentSchema ,z } from "@repo/common/types";
import { prismaClient } from "@repo/db-package/client";
const roomRouter: Router=express.Router();


roomRouter.post("/create-room",authMiddleware,async (req: authenticatedRequest,res:Response)=>{
    try{
    const parsedData=contentSchema.parse(req.body);
    const data=await prismaClient.room.findFirst({
        where:{
            name:parsedData.name,
        }
    });
    
    if(data){
        res.json({
            exist: true,
            message: "Room already exist, choose another name",
        })
        return;
    }
    const newRoom=await prismaClient.room.create({
        data:{
            name:parsedData.name,
            adminId: req.userId!,
        }
        
    })
    res.json({
        id: newRoom.id,
        message: "Room created successfully",
    })
    return;


    
    }catch(error){
        if(error instanceof z.ZodError){
            res.json({
                message: "Inavlid room data provided by user",
                error: error.errors[0]?.message,

            })
            return;
        }
        res.json({
            message:   "unexpected error occured while parsing" 
        })
        return;
    }

})

roomRouter.get("/get-chats/:roomId",async (req,res)=>{
    try{
        const roomId=String(req.params.roomId);
        console.log(`The room id is: ${req.params.roomId}`);
        const messages=await prismaClient.chat.findMany({
            where:{
                roomId:roomId
            },
            orderBy:{
                id: "desc"
            },
            take:1000
        })
        console.log(`The messages fetched from db are ${messages}`);
        res.json({
            messages
        })
        return;



    }catch(error){
        res.json({
            message: "error while getting chats",
            error: true,
        })
        return;


        
    }
})



roomRouter.get("/get-room/:slug",async(req:Request,res:Response)=>{
    try{
        const name=req.params.slug;
        console.log(`the slug for room is : ${name}`);
        const room=await prismaClient.room.findFirst({
            where:{
                name: name,
            }
        })
        console.log(room);
        console.log(JSON.stringify(room));
        res.json({
            room: room,
            message: "room found",
        })

    }catch(error){
        res.json({
            error: true,
            message: "error while getting the room",
        })
    }
})


export {roomRouter};