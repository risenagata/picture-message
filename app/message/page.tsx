//メッセージ一覧表示

import Card from "@/shared/components/Card";
import PageTitle from "@/shared/components/PageTitle";
import { DUMMY_messages } from "@/shared/types/types";
import Link from "next/link";


// 

export default function MessageBox(){
    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>受信箱</PageTitle>

            {DUMMY_messages.map((message)=>(
                <div key={message.id} className="w-full max-w-2xl mb-4">
                    <Link href={`/message/${message.id}`}>
                        <Card className={message.isRead ? "bg-gray-200" : ""}>
                            <p className="text-xs text-gray-300">{message.createdAt}</p>
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