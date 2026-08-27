'use client'

import Textarea from "@/shared/components/Textarea"
import createMessage from "./action"
import Button from "@/shared/components/Button"
import { IoSendSharp } from "react-icons/io5"
import { startTransition,useActionState, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"
import { MAX_Chars } from "@/shared/types/types"
import Canvas, { CanvasRef } from "@/shared/components/Canvas"

type Props={
    receiverId:string
}

export default function MessageForm({receiverId}:Props){
    const [chars,setChars]=useState(0)
    const [messageText,setMessageText]=useState("")
    const [canvasOpen,setCanvasOpen]=useState<boolean>(false)
    const [hasDrawing,setHasDrawing]=useState(false)
    const [state,formAction,isPending]=useActionState(createMessage,{success:false,message:""})
    const canvasRef = useRef<CanvasRef>(null)

    const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setChars(e.target.value.length)
        setMessageText(e.target.value)
    }
    const isOverLimit=chars > MAX_Chars


    const handleAction=async(formData:FormData)=>{
        // Canvasに描画がある時、画像を取得
        if(canvasRef.current?.hasDrawing()){
            const blob=await canvasRef.current.getBlob()
            if(blob){
                    formData.append("image",blob,"drawing.png")
            }
        }
        

        // 匿名処理
        const supabase = createClient()
        const {data:{user}}=await supabase.auth.getUser()
        if(!user){
            const {error}=await supabase.auth.signInAnonymously()
            if(error){
                toast.error("送信準備に失敗しました")
                return
            }
        }
        startTransition(()=>{
            formAction(formData)
        })
        
    }

    const handleCanvasOpen=()=>{
        if(canvasOpen){
            setHasDrawing(false)
        }
        setCanvasOpen(!canvasOpen)
    }

   useEffect(()=>{
    if(!state.message)return
    if(state.success){
        toast.success(state.message)
        setMessageText("")
        setChars(0)
    }else{
        toast.error(state.message)
    }
   },[state])
   
    return(
            <form 
            className="w-full max-w-2xl flex flex-col gap-4 pt-4"
            action={handleAction}
            >
                <div className="flex justify-between items-end">
                    <div>
                        <p className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-500"}`}>
                            {chars}/{MAX_Chars}
                        </p>
                    </div>
                    <div>
                        <Button type="submit" disabled={ isPending || isOverLimit || (chars === 0 && !hasDrawing)}>
                            <IoSendSharp />
                            {isPending? "送信中...":"送信"}
                        </Button>
                    </div>
                </div>
                <input type="hidden" name="receiverId" value={receiverId} />
                <Textarea 
                placeholder="これからも応援しています！"
                className="flex-1 w-full max-w-2xl min-h-[300px]  p-4 text-sm md:text-base border-gray-400"
                name="message"
                value={messageText}
                onChange={handleChange}
                />

                {canvasOpen && <Canvas ref={canvasRef} onDrawingChange={setHasDrawing} /> }

                <div className="w-full max-w-2xl flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <button
                        type="button" 
                        className="bg-white text-gray-500 rounded-full shadow w-8 h-8 hover:bg-gray-300"
                        onClick={handleCanvasOpen}
                        >
                            {canvasOpen ? "ー" : "+" }
                        </button>
                        <p className="text-sm text-gray-500">{canvasOpen ? "キャンバスを削除する" :"キャンバスを追加する"}</p>                    
                    </div>
                </div>
            </form>

    )
}