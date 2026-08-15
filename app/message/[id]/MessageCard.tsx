'use client'

import Button from "@/shared/components/Button";
// import Button from "@/shared/components/Button"
import Card from "@/shared/components/Card"
import ImageDownLoadButton from "@/shared/components/ImageDownloadButton";
import Link from "next/link";
import { useRef, useState } from "react";
// import { FaXTwitter } from "react-icons/fa6";

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

    return(
        <div className="flex flex-col items-center">
            <Link href="/message" className="self-start">
                <div className="flex items-center text-gray-500 p-2 hover:text-gray-700">
                    <p>＜ 受信箱へ戻る</p>
                </div>           
            </Link>
            <div className="flex items-center justify-between gap-4 mt-6">
                <ImageDownLoadButton targetRef={cardRef}/>
  
                <Button type="button" color="danger" onClick={()=>setIsDeleteConfirmOpen(true)}>メッセージ削除</Button>

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

            <div ref={cardRef}>
                <Card className="w-full max-w-2xl border-b-20 bg-white my-4 min-w-[500px] min-h-[100px]">
                    {message && (
                        <p className="whitespace-pre-wrap text-center">{message.content}</p>
                    )}
                    {imageUrl && (
                        <img src={imageUrl} alt="受信イラスト" className="max-w-full h-auto" />
                    )}
                    <p className="text-center font-bold text-sm">
                        PictMessa
                    </p>
                </Card>
            </div>



            {/* <div className="flex flex-col pt-8 items-center">
                <p className="text-xs text-gray-500">このメッセージをXで返信できます</p>
                <Button color="black">
                    <FaXTwitter/>
                    で返信する
                </Button>
            </div> */}

        </div>
    )
}