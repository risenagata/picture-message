'use server'


import { createClient } from "@/utils/supabase/server"


type EmailState={
  success:boolean,
  message:string
}

export default async function updateEmail(_:EmailState,formData:FormData){
    const email=formData.get("email") as string

    const supabase=await createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user){
    return{
        success:false,
        message:"ログインしてください"
    }
    }

    const { error } = await supabase.auth.updateUser(
        {email},
        {
            emailRedirectTo:`${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/setting`
        }
    );

    if(error){
        return{
            success:false,
            message:error.message

        }
    }


    return{
        success:true,
        message:"確認メールを送信しました"
    }
        
}