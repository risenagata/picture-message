'use client'
import Button from "@/shared/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import updateImage from "./action";
import { useRouter } from "next/navigation";


type Props={
    avatarUrl:string | null
}



export default function SettingImageForm({avatarUrl}:Props){
    const [preview,setPreview]=useState<string | null>(null) //選択した画像URL（http~）の表示管理のstate
    //選んだ画像そのもの（○○.pngとか）の管理のstate　 storageへアップロードするために画像そのものを保存
    const [file,setFile]=useState<File | null>(null)  

    const router=useRouter()


    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const selectFile=e.target.files?.[0]
        if(!selectFile)return
        const url=URL.createObjectURL(selectFile)
        setPreview(url)
        setFile(selectFile)
    }
    
    // inputタグをあとで触れるようにしておく
    const inputRef=useRef<HTMLInputElement>(null)
    const handleClick=()=>{
        inputRef.current?.click()
    }

    // 画像の保存処理
    const saveImage=async()=>{
        if(!file){
            toast.error("画像を選択してください")
            return
        }
        const formData=new FormData()
        formData.append("avatar",file)

        const result=await updateImage(
            {
                success:false,
                message:""
            },
            formData
        )

        if(result.success){
            toast.success(result.message)
            setPreview(null)
            setFile(null)
            router.refresh();
        }else{
            toast.error(result.message)
        }
    }

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return(
        <div className="w-full max-w-md pt-6">
            <div className="flex flex-col items-center gap-4">
                <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                    <Image 
                    src={preview ?? avatarUrl ?? "/user.png"}
                    alt="ユーザー画像"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover rounded-full"
                    />

                </div>

                <input 
                type="file"
                accept="image/*" 
                className="hidden"
                onChange={handleChange}
                ref={inputRef}
                />
                <button 
                type="button" 
                className="bg-gray-300 px-4 py-2 mb-12 border border-black rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={handleClick}
                >
                    画像を選ぶ
                </button>

                <Button color="primary" className="w-full" onClick={saveImage}>保存</Button>
                <Link href="/setting" className="w-full">
                    <Button color="secondary" className="w-full">キャンセル</Button>
                </Link>

            </div>

        </div>
    )
}