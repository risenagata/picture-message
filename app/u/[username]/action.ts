'use server'
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

type MessageState={
    success:boolean,
    message:string
}

export default async function createMessage(_:MessageState,formData:FormData):Promise<MessageState>{

    const receiverId=formData.get('receiverId') as string

    const thanksMessage=(formData.get('message') as string).trim()
    if(!thanksMessage){
        return{
            success:false,
            message:"メッセージを入力してください"
        }
    }

    const ngWords=await prisma.nGWord.findMany({
    where:{
        userId:receiverId
    }
    })

    if(ngWords.some((ng)=>thanksMessage.includes(ng.word))){
        return{
            success:false,
            message:"NGワードが含まれているため送信できませんでした"
        }
    }


    const user = await prisma.user.findUnique({
        where: {
            id: receiverId,
        },
    })
    if(!user){
        return{
            success:false,
            message:"ユーザーが見つかりません"
        }
    }

    await prisma.message.create({
        data:{
            receiverId,
            content:thanksMessage
        }
    })

    return{
        success:true,
        message:`${user.displayName}さんに感想を送りました`
    }

}