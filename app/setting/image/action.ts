'use server'

import { prisma } from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"


type ImageState={
    success:boolean,
    message:string
}

export default async function updateImage(_:ImageState,formData:FormData){
    const avatar=formData.get("avatar") as File  
    //prismaに保存したいのはavatarUrlだけど、最初に送るのは画像そのもの（SettingImageFormでいうfile）なのでavatar　ここの名前はキーと同じでなくてよい
    //ServerActionで受け取る時点ではまだavatarUrlは存在していない storageにアップロードするときにURLになってavatarUrlになる


    const supabase=await createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user){
    return{
        success:false,
        message:"ログインしてください"
    }
    }

    const currentUser=await prisma.user.findUnique({
        where:{
            id:user.id
        }
    })
  

    if (!avatar || avatar.size === 0) {
        return {
            success: false,
            message: "画像を選択してください",
        };
    }
    
    // supabaseでの保存場所を決める
    // 画像に毎回ランダムなUUIDでファイル名を付ける。過去に選んだ画像と同じ画像を選んだ時にエラーにならないようにする
    const ext = avatar.name.split(".").pop();
    const filePath=`${user.id}/${crypto.randomUUID()}.${ext}`

    // storageへ保存
    const {error}=
    await supabase
    .storage
    .from("avatars")
    .upload(filePath,avatar)



    if(error){
        console.error("ImageError:",error.message)
        return{
            success:false,
            message:"画像が保存できませんでした"
        }
    }

    //作成したURLをpublicUrlという変数に入れる 
    const {data:{ publicUrl }} = supabase
    .storage
    .from("avatars")
    .getPublicUrl(filePath);

    // Prismaに保存
    await prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            avatarUrl:publicUrl
        }
    })


    // 古い画像の削除
    if(currentUser?.avatarUrl){
        
        const path=currentUser.avatarUrl.split("/avatars/")[1]

        if(path){
        const {error:removeError}=await supabase.storage
        .from("avatars")
        .remove([path])

        console.log("removeError:",removeError)

        if (removeError) {
        console.error("古い画像の削除に失敗:", removeError.message);
         }
        }

    }


    
    revalidatePath("/setting/image")
    revalidatePath("/mypage");
    if(currentUser){
        revalidatePath(`/u/${currentUser.username}`)
    }



    return{
        success:true,
        message:"画像を変更しました"
    }


    
}