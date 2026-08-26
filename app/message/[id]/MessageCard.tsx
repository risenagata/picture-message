'use client'

import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card"
import ImageDownLoadButton from "@/shared/components/ImageDownloadButton";
import Link from "next/link";
import { useRef, useState } from "react";


type Props={
    message:{
        content:string | null,
        imageUrl:string | null
    }
    imageUrl:string | null
    deleteMessage: () => Promise<void>
}

export default function MessageCard({message,imageUrl,deleteMessage}:Props){
    const cardRef=useRef<HTMLDivElement>(null)
    const [isDeleteConfirmOpen,setIsDeleteConfirmOpen]=useState(false)

    //短文は真ん中表示にする
    const isShortMessage=(message.content?.length ?? 0)<=15

    return(
        <div className="flex w-full min-w-0 max-w-2xl flex-col items-center">
            <Link href="/message" className="self-start">
                <div className="flex items-center text-gray-500 p-2 hover:text-gray-700">
                    <p>＜ 受信箱へ戻る</p>
                </div>           
            </Link>
            <div className="flex items-center justify-between gap-4 mt-6">
                <ImageDownLoadButton targetRef={cardRef}/>
  
                <Button 
                type="button" 
                color="danger"
                className="shrink-0 whitespace-nowrap" 
                onClick={()=>setIsDeleteConfirmOpen(true)}>
                    メッセージ削除
                </Button>

            </div>
            {isDeleteConfirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-full  max-w-sm bg-white rounded-lg p-6 text-center">
                    <p className="mb-5">本当に削除しますか？</p>
                    <div className="flex items-center justify-center gap-4 py-2 ">
                        <form action={deleteMessage}>
                            <Button type="submit" color="primary">は い</Button>
                        </form>
                        <Button type="button" color="others" onClick={()=>setIsDeleteConfirmOpen(false)}>いいえ</Button>

                    </div>
                </div>  
            </div>
                
            )}

            <div ref={cardRef} className="w-full min-w-0">
                <Card className="my-4 min-h-[100px] w-full min-w-0 border-b-20 bg-white">
                    <div className="flex flex-1 flex-col items-center justify-center gap-4">
                        {message && (
                            <p 
                            className={`w-[80%] whitespace-pre-wrap mt-6 ${
                                isShortMessage ?"text-center":"text-left"
                            }`}>
                                {message.content}
                            </p>
                        )}
                        {imageUrl && (
                            <img src={imageUrl} alt="受信イラスト" className="max-w-[80%] h-auto" />
                        )}
                    </div>

                    <p className="text-center font-bold text-sm mt-6 text-gray-600/50">
                        PictoMessa
                    </p>
                </Card>
            </div>

        </div>
    )
}