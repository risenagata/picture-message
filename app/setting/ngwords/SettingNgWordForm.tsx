'use client'
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import addNGWord from "./action";
import { MAX_NGWords } from "@/shared/types/types";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";


type Props={
    ngWords:{
        id:string,
        word:string
    }[]
}





export default function SettingNgWordForm({ngWords}:Props){

    const canAdd=ngWords.length < MAX_NGWords

    const [state,formAction]=useActionState(addNGWord,{success:false,message:""})

    useEffect(()=>{
        if(!state.message)return
        if(state.success){
            return
        }else{
            toast.error(state.message)
        }
    },[state])

    return(
        <div>
            <form action={formAction} className="w-full max-w-md flex  gap-2 pt-6">
                <Input 
                type="text" 
                className="flex-1"
                name="word"
                />
                <Button type="submit">保存</Button>
                
                        
            </form>
            {!canAdd && (<p className="text-red-500 text-xs">NGワードは{MAX_NGWords}件まで登録できます。これ以上登録できません</p>)}
        </div>



    )
}