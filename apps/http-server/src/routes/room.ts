import express ,{Request,Response, Router} from "express";
import { authMiddleware } from "../middlewares/auth";
import { contentSchema ,z } from "@repo/common/types";
const roomRouter: Router=express.Router();


roomRouter.post("/create-room",authMiddleware,(req,res)=>{
    try{
    const parsedData=contentSchema.parse(req.body);
    
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
export {roomRouter};