'use client'
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const signupSchema=z.object({
    email:z.email("有効なメールアドレスを入力してください"),
    password:z
        .string()
        .min(8,"パスワードは8文字以上で入力してください")
        .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,"パスワードは半角英数字混合で入力してください")
})

type SignupFormValues=z.infer<typeof signupSchema>

export default function SignupForm(){
        const router=useRouter()

        const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<SignupFormValues>({
            resolver:zodResolver(signupSchema),
            defaultValues:{
                email:"",
                password:""
            }
        })

        const signup=async(data:SignupFormValues)=>{
            const supabase=createClient()
            const {error}=await supabase.auth.signUp({
                email:data.email,
                password:data.password
            })
            if(error){
                toast.error(error.message)
                return
            }
            toast.success("確認メールを送信しました。メールをご確認ください。")
        }

    return(
        <form className="w-full max-w-md" onSubmit={handleSubmit(signup)}>
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
                <Button type="submit" color="primary" disabled={isSubmitting}>{isSubmitting?"登録中...":"アカウント作成"}</Button>
            </div>


            </form>
    )
}