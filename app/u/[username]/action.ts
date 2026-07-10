'use server'
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"


export default async function createMessage(formData:FormData){

    const receiverId=formData.get('receiverId') as string

    const thanksMessage=(formData.get('message') as string).trim()
    if(!thanksMessage)return

    const ngWords=await prisma.nGWord.findMany({
    where:{
        userId:receiverId
    }
    })

    if(ngWords.some((ng)=>thanksMessage.includes(ng.word)))return


    await prisma.message.create({
        data:{
            receiverId,
            content:thanksMessage
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: receiverId,
        },
    })
    if(!user)return

    
    redirect(`/u/${user?.username}`)
}