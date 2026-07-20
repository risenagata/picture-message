'use client'

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import { updateDisplayName } from "./action";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const displayNameSchema=z.object({
    displayName:z
    .string()
    .min(1,"1文字以上で入力してください")
    .max(50,"50文字以内で入力してください"),
})
type DisplayNameFormValues=z.infer<typeof displayNameSchema>

type Props={
    displayName:string
}

export default function SettingNameForm({displayName}:Props){
    const router=useRouter()

    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<DisplayNameFormValues>({
        resolver:zodResolver(displayNameSchema),
                defaultValues:{
                    displayName,
                }
    })

    const settingDisplayName=async(data:DisplayNameFormValues)=>{
        const formData = new FormData();
        formData.append("displayName", data.displayName);

        const result=await updateDisplayName(
            {
                success:false,
                message:""
            },
            formData
        )
        if(result.success){
            toast.success(result.message)
            router.push("/setting")
            return
        }
        toast.error(result.message)
    }

    return(
        <form onSubmit={handleSubmit(settingDisplayName)} className="w-full max-w-md">
            <div className="py-6">
                <Label>現在の名前</Label>
                <p className="mt-2 text-gray-500">{displayName}</p>
            </div>
            <div className="py-6">
                <Label>変更後の名前</Label>
                <Input 
                type="text" 
                className="w-full"
                {...register("displayName")}
                />
                {errors.displayName && (
                        <p className="text-red-500 mt-1 text-sm">{errors.displayName.message}</p>
                )}
            </div>            

            <div className="flex flex-col justify-center items-center gap-4 pt-6">
                <Button type="submit" color="primary" className="w-full" disabled={isSubmitting}>
                    {isSubmitting?"保存中...":"保存"}
                </Button>
                <Link href="/setting" className="w-full">
                    <Button color="secondary" className="w-full">キャンセル</Button>
                </Link>
                
            </div>
        </form>
    )
}