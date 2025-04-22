import {prismaClient} from "@repo/db-package/client";
import express, {Request,Response, Router} from "express";
import { userdataMiddleware } from "../middlewares/userdatavalidator";
import  JWT_SECRET  from "@repo/common-backend/config";
import jwt from "jsonwebtoken";
const userRouter: Router=express.Router();
const JWT_secret=JWT_SECRET;

userRouter.post("/signup",userdataMiddleware,async (req: Request,res: Response)=>{
    try{
    
    const decodeddata=req.body;
    const result = await prismaClient.user.findFirst({
        where: {
            email: decodeddata.email,
            
        }
    })
    if(result){
        res.json({
            exist:true,
            message: "User with this email already exist",
        })
        return;
    }
    try{
        const created=await prismaClient.user.create({
            data:{
                email:decodeddata.email,
                password: decodeddata.password,
                name:decodeddata.name,
                avatar: decodeddata.avatar,
            }
        })
        res.json({
            message: "User created successfully",
            created: true,
        })

    }catch{
        console.log("error while creating user");
        res.json({
            message: "error while creating the user",
            notsignup: true,
        })
        return;
    }




}catch(error){
    console.log(` the error happened while signing up ${error}`);
    res.json({
        message: "error while signing up",
        notsignup: true,
    })
}


})



userRouter.post("/signin",userdataMiddleware,async (req: Request,res: Response)=>{
    try{
        const {email,password}=req.body;
        const user=await prismaClient.user.findFirst({
            where:{
                email: email,
                password: password,
            }
        })
        if(!user){
            res.json({
                message: "User not found or either password is wrong",
                notsignin: true,
            })
            return;
        }
        if(user){
            console.log(JWT_SECRET);
            const token=jwt.sign({userId: user.id},JWT_secret!);
            res.json({
                message: "User signed in successfully",
                token: token,
            })
        }


    }catch(error){
        console.log(error);
        console.log("error while signing in");
        res.json({
            message: "Error while signin",
            notsignin: true,

        })

    }
    
})
export {userRouter};