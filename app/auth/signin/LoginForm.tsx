'use client'

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import { z } from "zod";
import { useForm } from "react-hook-form" 
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



const loginSchema=z.object({
    email:z.email("有効なメールアドレスを入力してください"),
    password:z.string().min(6,"パスワードは6文字以上で入力してください")
})

type LoginFormValues=z.infer<typeof loginSchema>


export default function LoginForm(){
    const router =useRouter()


    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<LoginFormValues>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const login =async (data:LoginFormValues)=>{


        const supabase=createClient()
        const {error}=await supabase.auth.signInWithPassword({
            email:data.email,
            password:data.password
            
        })

        if(error){
           toast.error("メールアドレスまたはパスワードが正しくありません")
            return
        }
        toast.success("ログインしました")

        router.push("/mypage")
        router.refresh()
    }




    return(
        <form className="w-full max-w-md" onSubmit={handleSubmit(login)}>
                <div>
                    <Label>メールアドレス</Label>
                    <Input 
                    type="email" 
                    placeholder="example@mail.com"
                    className="w-full"
                    {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
                    )}
            
                </div>
                    <div className="mt-4">
                    <Label>パスワード</Label>
                    <Input 
                    type="password" 
                    placeholder="6文字以上の英数字"
                    className="w-full"
                    {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
                    )}
            
                </div>

            <div className="flex justify-center py-4">
                <Button type="submit" color="primary" disabled={isSubmitting}>{isSubmitting?"ログイン中...":"ログイン"}</Button>
            </div>
            


        </form>
    )
}