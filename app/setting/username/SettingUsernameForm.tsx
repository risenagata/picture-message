'use client'
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { updateUsername } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const usernameSchema=z.object({
    username:z
        .string()
        .min(3,"3文字以上で入力してください")
        .max(20,"20文字以内で入力してください")
        .regex(/^[a-zA-Z0-9_]+$/,"半角英数字とアンダースコア(_)のみ使用できます")
})
type UsernameValues=z.infer<typeof usernameSchema>

type Props={
    username:string
}

export default function SettingUsernameForm({username}:Props){
    const router =useRouter()

    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<UsernameValues>({
            resolver:zodResolver(usernameSchema),
                    defaultValues:{
                        username,
                    }
    })

    const settingUsername=async(data:UsernameValues)=>{
        const formData = new FormData();
        formData.append("username", data.username);

        const result=await updateUsername(
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
        <form onSubmit={handleSubmit(settingUsername)} className="w-full max-w-md">
            <div className="py-6">
                <Label>現在のユーザーID</Label>
                <p className="mt-2 text-gray-500">{username}</p>
            </div>
            <div className="py-6">
                <Label>変更後のユーザーID</Label>
                <Input 
                type="text" 
                className="w-full"
                {...register("username")}
                />
                {errors.username && (
                    <p className="text-red-500 mt-1 text-sm">{errors.username.message}</p>
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