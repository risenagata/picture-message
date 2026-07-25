'use server'

import { prisma } from "@/lib/prisma"
import { MAX_NGWords } from "@/shared/types/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

type NGWordState={
    success:boolean,
    message:string
}

export default async function addNGWord(_:NGWordState,formData:FormData): Promise<NGWordState>{

    const word=(formData.get('word') as string).trim()
    if (!word){
        return{
            success:false,
            message:"NGワードを入力してください"
        }
    }

    const supabase=await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if(!user){
        return{
            success:false,
            message:"ログインしてください"
        }
    }

    const exists=await prisma.nGWord.findFirst({
        where:{
            userId:user.id,
            word
        }
    })
    if(exists){
        return{
            success:false,
            message:"すでに登録されています"
        }
    }

    // 登録件数の上限
    const count=await prisma.nGWord.count({
        where:{
            userId:user.id
        }
    })
    if(count >= MAX_NGWords){
        return{
            success:false,
            message:`NGワードは${MAX_NGWords}件まで登録できます`
        }
    }

    await prisma.nGWord.create({
        data:{
            userId:user.id,
            word
        }
    })

    revalidatePath("/setting/ngwords")

    return {
    success: true,
    message: "登録しました"
}


}


export async function deleteWord(formData:FormData) {

    const id = formData.get("id") as string;

    const supabase = await createClient();
    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;  
    
    await prisma.nGWord.deleteMany({
        where:{
            id,
            userId:user.id
        }
    })
    

    revalidatePath("/setting/ngwords")
    
}