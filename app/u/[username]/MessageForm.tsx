'use client'

import Textarea from "@/shared/components/Textarea"
import createMessage from "./action"
import Button from "@/shared/components/Button"
import { IoSendSharp } from "react-icons/io5"
import { startTransition, useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"
import { MAX_Chars } from "@/shared/types/types"
import Canvas from "@/shared/components/Canvas"

type Props={
    receiverId:string
}

export default function MessageForm({receiverId}:Props){
    const [chars,setChars]=useState(0)
    const [state,formAction]=useActionState(createMessage,{success:false,message:""})

    const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setChars(e.target.value.length)
    }
    const isOverLimit=chars > MAX_Chars


    const handleAction=async(formData:FormData)=>{
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

   useEffect(()=>{
    if(!state.message)return
    if(state.success){
        toast.success(state.message)
    }else{
        toast.error(state.message)
    }
   },[state])
   
    return(
            <form 
            className="w-full max-w-2xl flex flex-col gap-4 pt-4"
            action={handleAction}
            >
                <input type="hidden" name="receiverId" value={receiverId} />
                <Textarea 
                placeholder="これからも応援しています！"
                className="flex-1 w-full max-w-2xl min-h-[300px]  p-4 text-base border-gray-400"
                name="message"
                onChange={handleChange}
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
                    <div>
                    <p className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-500"}`}>
                        {chars}/{MAX_Chars}
                    </p>
                </div>

                </div>
                <div className="flex justify-end">
                    <Button type="submit" disabled={isOverLimit || chars === 0}>
                        <IoSendSharp />
                        送信
                    </Button>
                </div>

                <Canvas />                

            </form>

    )
}