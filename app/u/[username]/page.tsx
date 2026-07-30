//メッセージ作成画面

import { prisma } from "@/lib/prisma";
import PageTitle from "@/shared/components/PageTitle";
import MessageForm from "./MessageForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";


export default async function MessageCreate({params}:{params:Promise<{username:string}>}){

    const supabase =await createClient()
    const {data:{user}}=await supabase.auth.getUser()
    if(!user){
        redirect("/auth/signin")
        }

    const profile=await prisma.user.findUnique({
    where:{
        id:user.id
        }
    })
    if (!profile) {
    redirect("/onboarding");
    }


    const {username}=await params
    const userName =await prisma.user.findUnique({
        where:{
            username
        }
    })
    if(!userName){
        return(
            <p>ユーザーが見当たりません</p>
        )
    }





    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>{profile.displayName}さんへメッセージを送る</PageTitle>
            <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                <Image 
                src={profile.avatarUrl ?? "/user.png"}
                alt="ユーザー画像"
                width={128}
                height={128}
                className="h-full w-full object-cover rounded-full"
                />
            </div>

            <MessageForm receiverId={profile.id} />
            
            
            
        </div>
    )
}