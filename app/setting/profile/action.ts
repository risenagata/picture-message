'use server'

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";


type DisplayNameState={
  success:boolean,
  message:string
}


export async function updateDisplayName(_:DisplayNameState,formData: FormData):Promise<DisplayNameState> {
  const displayName = formData.get("displayName") as string;

  const supabase=await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  if (!user){
    return{
      success:false,
      message:"ログインしてください"
    }
  }


  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      displayName,
    },
  });


  return{
    success:true,
    message:"保存しました"
  }



  
}