import {z} from "zod";

const userSchema=z.object({
    email: z.string().email().min(1,{message: "email is required"}),
    password: z.string().min(1,{message: "Password is required"}),
    name: z.string().optional(),
    avatar: z.string().url().optional(),


})
export {userSchema,z}