'use server'
import { sendNewMessageMail } from "@/lib/mail"
import { moderateMessage } from "@/lib/moderateMessage"
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
    const image=formData.get('image')
    const thanksMessage=(formData.get('message') as string).trim()

    const hasImage=image instanceof File && image.size > 0
    const hasMessage=thanksMessage.length > 0
    
    if(!hasMessage && !hasImage){
        return{
            success:false,
            message:"メッセージまたはイラストを入力してください"
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

    // Geminiでの不適切投稿チェック
    
    if(hasMessage){
        const moderation=await moderateMessage(thanksMessage)
        if(!moderation.ok){
            return{
                success:false,
                message:moderation.reason ?? "不適切な内容のため送信できませんでした"
            }
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

    // 画像ファイルのアップロード
    let imagePath:string | null=null

    if(image instanceof File && image.size > 0){
        const fileName=`${crypto.randomUUID()}.png`
        const filePath=`${receiverId}/${fileName}`

        const{data,error}=await supabase.storage
        .from("message-images")
        .upload(filePath,image,{
            contentType:image.type,
            upsert:false
        })
        if(error){
            console.error("画像アップロードエラー：",error)
            return{
                success:false,
                message:"イラストの保存に失敗しました"
            }
        }
        imagePath=data.path
        console.log("画像アップロード成功：",data.path)
    }

    // メッセージ送信
    await prisma.message.create({
        data:{
            receiverId,
            senderGuestId:user.id,
            content:thanksMessage,
            imageUrl:imagePath
        }
    })

    // メール通知機能
    sendNewMessageMail(receiver.email,receiver.displayName)


    return{
        success:true,
        message:`${receiver.displayName}さんに感想を送りました`
    }

}