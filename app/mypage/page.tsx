//マイページ

import { prisma } from "@/lib/prisma";
import Copy from "@/shared/components/Copy";
import Label from "@/shared/components/Label";
import { LogoutButton } from "@/shared/components/LogoutButton";
import PageTitle from "@/shared/components/PageTitle";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";





export default async function Mypage(){

    const supabase=await createClient()
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

    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>マイページ</PageTitle>

            <Link href="/setting/image">
                <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                    <Image 
                    src={profile.avatarUrl ?? "/user.png"}
                    alt="ユーザー画像"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover rounded-full"
                    />
                </div>            
            </Link>

 

            <div className="w-full max-w-md">
                <div className="mt-4">
                    <Label>名前</Label>
                    <p>{profile.displayName}</p>
                </div>
                <div className="mt-4">
                    <Label>ユーザーID</Label>
                    <p>{profile.username}</p>
                </div>
                <div className="mt-4" >
                    <Label>メールアドレス</Label>
                    <p>{profile.email}</p>
                </div>
                <div className="mt-4">
                    <Label>アカウント</Label>
                    <p>{profile.xAccount}</p>
                </div>
                <div className="my-4">
                    <Label>マイURL</Label>

                        <div className="flex items-center gap-4">
                            <p className="border-b-1 text-blue-500">http://pictmessa.com/u/{profile.username}</p>

                            <Copy username={profile.username} />

                            
                        </div>


                    
                </div>

            </div>
            
            <div className="p-8">
                <LogoutButton />
            </div>


        </div>
        
    )
}