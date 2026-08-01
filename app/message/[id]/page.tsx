//メッセージ詳細

import { prisma } from "@/lib/prisma";
import MessageCard from "./MessageCard";



export default async function MessageDetail({
  params
}:{
  params:Promise<{id:string}>
}) {


  const {id}=await params

  const message=await prisma.message.findUnique({
    where:{
      id
    }
  })

  await prisma.message.update({
    where:{
      id
    },
    data:{
      isRead:true
    }
  })



  if(!message){
    return(
      <div className="m-5 flex justify-center items-center">
        <p className="text-gray-500">メッセージが見当たりません</p>

      </div>
    )
  }

  return (
    <div className="m-5 flex flex-col items-center gap-4">

      <MessageCard message={message.content} />

    </div>
    
  );
}