import dotenv from 'dotenv';
import "dotenv/config";
import { json } from 'stream/consumers';
dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET|| "hkbcipewboielb";
export {JWT_SECRET};