//メッセージ作成画面

import { prisma } from "@/lib/prisma";
import PageTitle from "@/shared/components/PageTitle";
import MessageForm from "./MessageForm";


export default async function MessageCreate({params}:{params:Promise<{username:string}>}){

    const {username}=await params
    const user=await prisma.user.findUnique({
        where:{
            username
        }
    })
    if(!user){
        return <p>ユーザーが見つかりません</p>
    }


    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>{user?.displayName}さんへメッセージを送る</PageTitle>
            <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                {/* imgやImage */}
            </div>

            <MessageForm receiverId={user.id} />
            
            
            
        </div>
    )
}