'use client'

import Textarea from "@/shared/components/Textarea"
import createMessage from "./action"
import Button from "@/shared/components/Button"
import { IoSendSharp } from "react-icons/io5"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

type Props={
    receiverId:string
}

export default function MessageForm({receiverId}:Props){

    const [state,formAction]=useActionState(createMessage,{success:false,message:""})

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
            action={formAction}
            >
                <input type="hidden" name="receiverId" value={receiverId} />
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
    )
}