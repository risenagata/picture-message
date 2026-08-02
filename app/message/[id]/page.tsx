//メッセージ詳細

import { prisma } from "@/lib/prisma";
import MessageCard from "./MessageCard";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";



export default async function MessageDetail({
  params
}:{
  params:Promise<{id:string}>
}) {

  const {id}=await params

  const supabase=await createClient()
  const {data:{user}}=await supabase.auth.getUser()
  if(!user){
    redirect("/auth/signin")
  }

  

  const message=await prisma.message.findUnique({
    where:{
      id
    }
  })
  if(!message || message.receiverId !== user.id){
    notFound()
  }

  await prisma.message.update({
    where:{
      id
    },
    data:{
      isRead:true
    }
  })



  return (
    <div className="m-5 flex flex-col items-center gap-4">

      <MessageCard message={message} />

    </div>
    
  );
}