"use client"
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";



export default function Home(){
  const [roomId,setroomId]=useState("");
  const router=useRouter();
  return <div className="bg-black flex justify-center items-center gap-6 h-screen">
    <input className="px-4 py-2 bg-white rounded" value={roomId} type="text" placeholder="slug" onChange={(e)=>{
      setroomId(e.target.value)

    }} />
    <button className="bg-white rounded p-2 cursor-pointer" onClick={()=>{
      router.push(`/room/${roomId}`)
    }}>Join room</button>
  </div>
  



  

}
