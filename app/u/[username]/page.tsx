//メッセージ作成画面

import { prisma } from "@/lib/prisma";
import PageTitle from "@/shared/components/PageTitle";
import MessageForm from "./MessageForm";
import Image from "next/image";


export default async function MessageCreate({params}:{params:Promise<{username:string}>}){

    // URLのusernameからユーザーを取得する
    const {username}=await params
    const receiver =await prisma.user.findUnique({
        where:{
            username
        }
    })
    if(!receiver){
        return(
            <p>ユーザーが見当たりません</p>
        )
    }

    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>{receiver.displayName}さんへメッセージを送る</PageTitle>
            <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                <Image 
                src={receiver.avatarUrl ?? "/user.png"}
                alt="ユーザー画像"
                width={128}
                height={128}
                className="h-full w-full object-cover rounded-full"
                />
            </div>

            <p className="text-gray-500 text-xs mt-4">
                メッセージのみ・イラストのみ・メッセージ＋イラストのいずれかで送信ができます
            </p>

            <MessageForm receiverId={receiver.id} />
            
            
            
        </div>
    )
}