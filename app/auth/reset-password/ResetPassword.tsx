'use client'

import { EmailFormValues, emailSchema } from "@/app/setting/email/SettingEmailForm";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPasswordForm(){

    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<EmailFormValues>({
        resolver:zodResolver(emailSchema),
                            defaultValues:{
                                email:"",
                            }
    })

    const handleReset=async(data:EmailFormValues)=>{
        const supabase=createClient()

        const {error}=await supabase.auth.resetPasswordForEmail(
            data.email,
            {
                redirectTo:`${window.location.origin}/auth/updatePassword`
            }
        )

        if (error) {
            toast.error("再設定メールの送信に失敗しました")
            return
        }

        toast.success("パスワード再設定メールを送信しました")

    }

    return(
        <form onSubmit={handleSubmit(handleReset)} className="w-full max-w-md">
            
            <Label>再設定用メールアドレス</Label>
            <Input 
            type="email"
            className="w-full"
            placeholder="example@mail.com"
            {...register("email")}
            />
            {errors.email && (
                <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
            )}
            <Button type="submit" color="primary" className="w-full mt-6" disabled={isSubmitting}>
                {isSubmitting?"送信中...":"送信"}
            </Button>
            <p className="my-4 text-xs text-gray-500">
                アプリに登録しているメールアドレスを入力してください
            </p>


        </form>
    )
}