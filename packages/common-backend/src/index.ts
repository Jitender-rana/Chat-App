import dotenv from 'dotenv';
import "dotenv/config";

dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET|| "hkbcipewboielb";
export {JWT_SECRET};