//メッセージ作成画面

import { prisma } from "@/lib/prisma";
import Button from "@/shared/components/Button";
import PageTitle from "@/shared/components/PageTitle";
import Textarea from "@/shared/components/Textarea";

import { IoSendSharp } from "react-icons/io5";
import createMessage from "./action";


export default async function MessageCreate({params}:{params:Promise<{username:string}>}){

    const {username}=await params
    const user=await prisma.user.findUnique({
        where:{
            username
        }
    })


    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>{user?.displayName}さんへメッセージを送る</PageTitle>
            <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                {/* imgやImage */}
            </div>
            <form 
            className="w-full max-w-2xl flex flex-col gap-4 pt-4"
            action={createMessage}
            >
                <input type="hidden" name="receiverId" value={user?.id} />
                <Textarea 
                placeholder="これからも応援しています！"
                className="flex-1 w-full max-w-2xl min-h-[300px]  p-4 text-lg border-gray-400"
                name="message"
                />
                
                
                <div className="w-full max-w-2xl flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <button
                        type="button" 
                        className="bg-white text-gray-500 rounded-full w-8 h-8 hover:bg-gray-300">
                            +
                        </button>
                        <p className="text-sm text-gray-500">キャンバスを追加する</p>                    
                    </div>

                    <Button type="submit">
                        <IoSendSharp />
                        送信
                    </Button>
                </div>

            </form>
            
            
            
        </div>
    )
}