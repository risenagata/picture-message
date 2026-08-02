'use server'
import { prisma } from "@/lib/prisma"
import { MAX_Chars } from "@/shared/types/types"
import { createClient } from "@/utils/supabase/server"


type MessageState={
    success:boolean,
    message:string
}

export default async function createMessage(_:MessageState,formData:FormData):Promise<MessageState>{

    // メッセージ中身確認
    const receiverId=formData.get('receiverId') as string

    const thanksMessage=(formData.get('message') as string).trim()
    if(!thanksMessage){
        return{
            success:false,
            message:"メッセージを入力してください"
        }
    }

    // 文字数制限の確認
    if(thanksMessage.length > MAX_Chars){
        return{
            success:false,
            message:`${MAX_Chars}文字以内で入力してください`
        }
    }


    // NGワード確認
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


    // 送信先ユーザーの取得
    const receiver = await prisma.user.findUnique({
        where: {
            id: receiverId,
        },
    })
    if(!receiver){
        return{
            success:false,
            message:"ユーザーが見つかりません"
        }
    }

    // 匿名送信者情報の取得
    const supabase=await createClient()
    const {data:{user}}=await supabase.auth.getUser()
    if(!user){
        return{
            success:false,
            message:"匿名による送信者情報の取得ができませんでした"
        }
    }

    // メッセージ送信
    await prisma.message.create({
        data:{
            receiverId,
            senderGuestId:user.id,
            content:thanksMessage
        }
    })

    return{
        success:true,
        message:`${receiver.displayName}さんに感想を送りました`
    }

}