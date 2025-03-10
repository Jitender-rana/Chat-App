import { userSchema,z } from "@repo/common/types";
import { NextFunction ,Request,Response } from "express";
function userdataMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        req.body=userSchema.parse(req.body);
        next();
    }catch(error){
        if(error instanceof z.ZodError){
            
            
            res.json({
                message: "validation error",
                error: error.errors[0]?.message,

            })
            return;
        }
        res.json({
            message:   "unexpected error occured while parsing" 
        })
        return;
    }
}
export {userdataMiddleware};