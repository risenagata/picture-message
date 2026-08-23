//URLをクリップボードにコピーする実装
'use client'
import { FaRegCopy } from "react-icons/fa6"
import { toast } from "sonner"


type CopyProps={
    username:string
}

export default function Copy({username}:CopyProps){
    const clickHandler=async()=>{
        
        const message=`${process.env.NEXT_PUBLIC_APP_URL}/u/${username}`
        
        try{
            await navigator.clipboard.writeText(message)
            toast.success('コピーしました')
        }catch(error){
            toast.error('コピーできませんでした')
        }
    }
    
    return(
        <>
        <button onClick={clickHandler} className="active:scale-90">
            <div className="text-gray-500 text-lg p-2 bg-gray-100 border border-gray-300 rounded-md">
                <FaRegCopy />
            </div>
            
        </button>
        </>
    )
    
}