'use client'

import Button from "@/shared/components/Button"
import Card from "@/shared/components/Card"
import ImageDownLoadButton from "@/shared/components/ImageDownloadButton";
import { useRef } from "react";
import { FaXTwitter } from "react-icons/fa6";

type Props={
    message:string | null
}

export default function MessageCard({message}:Props){
    const cardRef=useRef<HTMLDivElement>(null)

    return(
        <div className="flex flex-col items-center">
            <div ref={cardRef}>
                <Card className="w-full max-w-2xl bg-white my-4">
                    {message && (
                        <p className="whitespace-pre-wrap">{message}</p>
                    )}

                </Card>
            </div>

            <ImageDownLoadButton targetRef={cardRef}/>

            <div className="flex flex-col pt-8 items-center">
                <p className="text-xs text-gray-500">このメッセージをXで返信できます</p>
                <Button color="black">
                    <FaXTwitter/>
                    で返信する
                </Button>
            </div>
 
        </div>
    )
}