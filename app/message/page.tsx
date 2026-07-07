//メッセージ一覧表示

import { prisma } from "@/lib/prisma";
import Card from "@/shared/components/Card";
import PageTitle from "@/shared/components/PageTitle";
import Link from "next/link";


// 

export default async function MessageBox(){

    const user=await prisma.user.findFirst()

    const messages=await prisma.message.findMany({
        where:{
            receiverId:user!.id
        },
        orderBy:[
            {isRead:"asc"},
            {createdAt:"desc"}
        ]
    })

    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>受信箱</PageTitle>

            {messages.map((message)=>(
                <div key={message.id} className="w-full max-w-2xl mb-4">
                    <Link href={`/message/${message.id}`}>
                        <Card className={message.isRead ? "bg-gray-200" : ""}>
                            <p className="text-xs text-gray-300">{message.createdAt.toLocaleDateString()}</p>
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