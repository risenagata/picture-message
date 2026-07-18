'use server'

import { prisma } from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"



type ProfileState={
    success:boolean,
    message:string,

}

export default async function createProfileAction(_:ProfileState,formData:FormData):Promise<ProfileState>{

    const supabase=await createClient()

    const {data:{user}}=await supabase.auth.getUser()

    if(!user){
        return{
            success:false,
            message:"ログインしてください"
        }
    }

    const displayName=formData.get('displayName') as string
    const username=formData.get('username') as string

    //すでにプロフィールを作成していないか 
    const profile = await prisma.user.findUnique({
    where: {
        id: user.id,
        },
    });

    if (profile) {
        return {
            success: false,
            message: "プロフィールは登録済みです",
        };
    }

    
    // すでに使われているusernameでないか
    const exists=await prisma.user.findUnique({
        where:{
            username
        }
    })
    if(exists){
        return{
        success:false,
        message:"このユーザーIDはすでに使用されています"
        }

    }


    await prisma.user.create({
    data: {
        id: user.id,
        email: user.email!,
        displayName,
        username
  },


    });

    return{
    success:true,
    message:"ようこそ、ピクトメッセへ！"
  }


} 