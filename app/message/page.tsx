//メッセージ一覧表示

import { prisma } from "@/lib/prisma";
import Card from "@/shared/components/Card";
import PageTitle from "@/shared/components/PageTitle";
import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { redirect } from "next/navigation";




export default async function MessageBox(){

    const supabase=await createClient()
    const { data: { user } } = await supabase.auth.getUser();
        if(!user){
        redirect("/auth/signin")
    }

    const messages=await prisma.message.findMany({
        where:{
            receiverId:user.id
        },
        orderBy:[
            {isRead:"asc"},
            {createdAt:"desc"}
        ]
    })

   
    return(

        
        <div className="m-5 flex flex-col items-center">
            <PageTitle>受信箱</PageTitle>

            {!messages.length && 
                (
                    <p className="text-gray-500 py-4">まだメッセージは届いていません</p>
                )                               
            }

            {messages.map((message)=>(
                <div key={message.id} className="w-full max-w-2xl my-4">
                    <Link href={`/message/${message.id}`}>
                        <Card className={message.isRead ? "bg-gray-200" : ""}>
                            <p className="text-xs text-gray-300">
                                {formatDistanceToNow(new Date(message.createdAt),
                                {
                                    addSuffix:true,
                                    locale:ja
                                })}
                                
                            </p>
                            {message.content && 
                            (<p className="line-clamp-1">
                            {message.content}
                            </p>)}


                        </Card>
                        
                    </Link>
                </div>
            ))}


        </div>
    )
}