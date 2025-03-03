import { JWT_SECRET } from "@repo/common-backend/config";
import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export interface authenticatedRequest extends Request{
    userEmail?: String,
}
function authMiddleware(req: authenticatedRequest,res:Response,next:NextFunction){
    try{
        const myauthHeader=req.headers.authorization;
        if(!myauthHeader || !myauthHeader.startsWith('Bearer')){
            res.json({
                auth: false,
                message: "token is required"
            })
            return;
        }
        const token = myauthHeader.split(" ")[1];
        if(!token){
            res.json({
                auth: false,
                message: "Not a valid token is signed up",
            })
            return;
        }
        const decodeddata=jwt.verify(token,JWT_SECRET) as JwtPayload;
        if(decodeddata &&  typeof decodeddata==="object" && decodeddata.email){
            req.userEmail=decodeddata.email;
            next();
        }else{
            res.json({
                noauth: false,
                message: "invalid token 2",
            })
        }



    }catch(error){
        console.error("Error during authentication:", error);
        res.json({ message: "Invalid token 2" });
        return;

    }
    

}
export {authMiddleware};