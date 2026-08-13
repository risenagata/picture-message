//メッセージ一覧表示

import { prisma } from "@/lib/prisma";
import Card from "@/shared/components/Card";
import PageTitle from "@/shared/components/PageTitle";
import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AiFillPicture } from "react-icons/ai";




export default async function MessageBox({searchParams}:{searchParams:Promise<{page?:string}>}){

    const {page}=await searchParams
    const currentPage=Number(page) || 1

    const supabase=await createClient()
    const { data: { user } } = await supabase.auth.getUser();
        if(!user){
        redirect("/auth/signin")
    }

    const pageSize=10

    const messages=await prisma.message.findMany({
        where:{
            receiverId:user.id
        },
        orderBy:[
            {isRead:"asc"},
            {createdAt:"desc"}
        ],
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    })

    const totalMessages=await prisma.message.count({
        where:{
            receiverId:user.id
        }
    })
  
    const totalPages=Math.ceil(totalMessages / pageSize)

   
    return(

        
        <div className="m-5 flex flex-col items-center">
            <PageTitle>受信箱</PageTitle>

            <div className="w-full max-w-2xl">
                <p className="text-sm text-gray-500">
                    全{totalMessages}件中{messages.length}件表示
                </p>
            </div>

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
                            <p className="line-clamp-1">
                                {message.content}
                            </p>

                            {message.imageUrl && (
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <AiFillPicture />
                                    <p>
                                        イラストメッセージが届いています
                                    </p>
                                </div>
                                                   
                            )}


                        </Card>
                        
                    </Link>
                </div>
            ))}

            

            <div className="border border-yellow-500 rounded-md px-2 py-1 flex gap-2 justify-center items-center">
                <Link href={`/message?page=${currentPage - 1}`}>
                    <button 
                    type="button" 
                    disabled={currentPage === 1} 
                    className="p-1 pr-4 rounded-full text-yellow-500 hover:text-yellow-600 disabled:cursor-not-allowed disabled:text-gray-300 disabled:opacity-50">
                        ＜ 前へ
                    </button>                
                </Link>

                <div className="flex gap-2 items-center text-gray-400">
                    <p className="text-xl text-bold">{currentPage}</p>
                    <p className="text-sm">/</p>
                    <p className="text-xl text-bold">{totalPages}</p>
                </div>

                <Link href={`/message?page=${currentPage + 1}`}>
                    <button type="button" disabled={currentPage === totalPages} className="p-1 pl-4 rounded-full text-yellow-500 hover:text-yellow-600 disabled:cursor-not-allowed disabled:text-gray-300 disabled:opacity-50">
                        次へ ＞
                    </button>                
                </Link>
            </div>


        </div>
    )
}