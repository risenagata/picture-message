//URLをクリップボードにコピーする実装
'use client'
import { FaRegCopy } from "react-icons/fa6"
import { DUMMY_profile } from "../types/types"

export default function Copy(){
    const clickHandler=async()=>{
        const message=DUMMY_profile.myURL
        
        try{
            await navigator.clipboard.writeText(message)
            alert('コピーしました')
        }catch(error){
            alert('コピーできませんでした')
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