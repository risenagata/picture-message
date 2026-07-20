//URLをクリップボードにコピーする実装
'use client'
import { FaRegCopy } from "react-icons/fa6"
import { toast } from "sonner"


type CopyProps={
    username:string
}

export default function Copy({username}:CopyProps){
    const clickHandler=async()=>{
        
        const message=`http://pictmessa.com/u/${username}`
        
        try{
            await navigator.clipboard.writeText(message)
            toast.success('コピーしました')
        }catch(error){
            toast.error('コピーできませんでした')
        }
    }
    
    return(
        <>
        <button onClick={clickHandler}>
            <div className="text-gray-500 text-lg p-2">
                <FaRegCopy />
            </div>
            
        </button>
        </>
    )
    
}