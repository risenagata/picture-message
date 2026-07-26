'use client'

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";



const passwordSchema=z
.object({
    password:z
        .string()
        .min(8,"パスワードは8文字以上で入力してください")
        .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,"パスワードは半角英数字混合で入力してください"),
    passwordConfirm:z
        .string()
        .min(8,"パスワードは8文字以上で入力してください")
})
.refine((data)=>data.password === data.passwordConfirm,{
    message:"パスワードが一致しません",
    path:["passwordConfirm"]
})


type PasswordFormValue=z.infer<typeof passwordSchema>

export default function SettingPasswordForm(){
    const router =useRouter()
    const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm<PasswordFormValue>({
        resolver:zodResolver(passwordSchema),
            defaultValues:{
                password:"",
                passwordConfirm:""
            }

    })

    const SettingPassword=async(data:PasswordFormValue)=>{
        const supabase=createClient()
        
        const {error}=await supabase.auth.updateUser({
            password:data.password
        })

        if(error){
            toast.error(error.message)
            return
        }
        toast.success("パスワードを変更しました")
        reset()
        router.push("/setting")

    }

    return(
            <form onSubmit={handleSubmit(SettingPassword)} className="w-full max-w-md">
                <div className="py-6">
                    <Label>新しいパスワード</Label>
                    <Input 
                    type="password" 
                    placeholder="英数字8文字以上" 
                    className="w-full"
                    {...register("password")}
                    />
                </div>
                {errors.password && (
                        <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
                )}
                <div className="py-6">
                    <Label>新しいパスワード（確認用）</Label>
                    <Input 
                    type="password" 
                    placeholder="英数字8文字以上" 
                    className="w-full"
                    {...register("passwordConfirm")}
                    />
                </div>
                {errors.passwordConfirm && (
                        <p className="text-red-500 mt-1 text-sm">{errors.passwordConfirm.message}</p>
                )}

                
                <div className="flex flex-col justify-center items-center gap-4 pt-6">
                    <Button type="submit" color="primary" className="w-full" disabled={isSubmitting}>
                        {isSubmitting?"...保存中":"保存"}
                    </Button>
                    <Link href="/setting" className="w-full">
                        <Button color="secondary" className="w-full">キャンセル</Button>
                    </Link>
                    
                </div>

            </form>
    )
}