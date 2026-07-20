'use server'

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

type UsernameState={
  success:boolean,
  message:string
}


export async function updateUsername(_:UsernameState,formData:FormData){
    const username = formData.get("username") as string;

    const supabase=await createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user){
    return{
        success:false,
        message:"ログインしてください"
        }
    }

    // すでに使われているusernameでないか
    const exists=await prisma.user.findUnique({
        where:{
            username
        }
    })
    if(exists && exists.id !== user.id){
        return{
        success:false,
        message:"このユーザーIDはすでに使用されています"
        }

    }

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            username,
        },
    });



      return{
        success:true,
        message:"保存しました"
    }

}