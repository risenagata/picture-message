//メッセージ詳細

import { prisma } from "@/lib/prisma";
import MessageCard from "./MessageCard";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



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

  // イラストの取得（supabase.storageから画像を持ってくる）
  let imageUrl:string | null=null
  if(message.imageUrl){
    const {data,error}=await supabase.storage
    .from("message-images")
    .createSignedUrl(message.imageUrl,60*60) //60*60は有効時間1時間という意味


    if(error){
      console.error("画像取得エラー：",error)
    }else{
      imageUrl=data.signedUrl  //data.signedUrlはDBに保存したstorage内のパス
    }
  }

  // メッセージ削除処理
  const deleteMessage=async()=>{
    'use server'
    const supabase =await createClient()
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
    
    // メッセージにイラストがある場合　ストレージの画像も削除
    if(message.imageUrl){
      const {error}=await supabase.storage
      .from("message-images")
      .remove([message.imageUrl])
      if(error){
        console.error("画像削除エラー：",error)
      }
    }

    await prisma.message.delete({
      where:{
        id
      }
    })
    revalidatePath("/message")
    redirect("/message")
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
    <div className="flex w-full flex-col items-center gap-4 py-5">

      <MessageCard message={message} imageUrl={imageUrl} deleteMessage={deleteMessage} />

    </div>
    
  );
}