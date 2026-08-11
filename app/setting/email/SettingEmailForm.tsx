'use client'
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const emailSchema=z.object({
    email:z.email("有効なメールアドレスを入力してください")
     
})
type EmailFormValues=z.infer<typeof emailSchema>

type Props={
    email:string
}

export default function SettingEmailForm({email}:Props){
    const router=useRouter()
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<EmailFormValues>({
            resolver:zodResolver(emailSchema),
                    defaultValues:{
                        email:"",
                    }
    })

    const SettingEmail=async(data:EmailFormValues)=>{
        const supabase= createClient()
        const {error}=await supabase.auth.updateUser(
        {email:data.email},
        {
            emailRedirectTo:"http://localhost:3000/auth/callback?next=/setting"
        }
        )

        if(error){
            toast.error(error.message)
            return
        }
        toast.success("確認メールを送信しました。メールをご確認ください。")
    }



    return(
            <form onSubmit={handleSubmit(SettingEmail)} className="w-full max-w-md">
                <div className="py-6">
                    <Label>現在のメールアドレス</Label>
                    <p className="mt-2 text-gray-500">{email}</p>
                </div>
                <div className="py-6">
                    <Label>変更後のメールアドレス</Label>
                    <Input 
                    type="email" 
                    className="w-full"
                    {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
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