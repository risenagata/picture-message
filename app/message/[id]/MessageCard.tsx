'use client'

// import Button from "@/shared/components/Button"
import Card from "@/shared/components/Card"
import ImageDownLoadButton from "@/shared/components/ImageDownloadButton";
import Link from "next/link";
import { useRef } from "react";
import { IoIosReturnLeft } from "react-icons/io";
// import { FaXTwitter } from "react-icons/fa6";

type Props={
    message:{
        content:string | null,
        imageUrl:string | null
    }
    imageUrl:string | null
}

export default function MessageCard({message,imageUrl}:Props){
    const cardRef=useRef<HTMLDivElement>(null)

    return(
        <div className="flex flex-col items-center">
            <Link href="/message" className="self-start">
                <div className="flex items-center text-gray-500 p-2">
                    <IoIosReturnLeft />
                    <p> 受信箱へ戻る</p>
                </div>           
            </Link>
            <ImageDownLoadButton targetRef={cardRef}/>
            <div ref={cardRef}>
                <Card className="w-full max-w-2xl border-b-20 bg-white my-4 min-w-[500px] min-h-[100px]">
                    {message && (
                        <p className="whitespace-pre-wrap text-center">{message.content}</p>
                    )}
                    {imageUrl && (
                        <img src={imageUrl} alt="受信イラスト" className="max-w-full h-auto" />
                    )}

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