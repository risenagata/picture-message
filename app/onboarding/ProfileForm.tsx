'use client'

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const profileSchema=z.object({
    displayName:z
    .string()
    .min(1,"1文字以上で入力してください")
    .max(50,"50文字以内で入力してください"),

    username:z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/,"半角英数字とアンダーバー(_)のみ使用できます")
    .min(3,"3文字以上で入力してください")
    .max(20,"20文字以内で入力してください")
})

type ProfileFormValues=z.infer<typeof profileSchema>

export default function ProfileForm(){

    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<ProfileFormValues>({
        resolver:zodResolver(profileSchema),
        defaultValues:{
            displayName:"",
            username:""
        }
    })

    return(
            <form action="" className="w-full max-w-md" onSubmit={handleSubmit()}>
                <div className="my-4">
                    <Label>名前</Label>
                    <Input 
                    type="text" 
                    placeholder="メッセさん" 
                    className="w-full"
                    {...register("displayName")}
                    required />
                    {errors.displayName && (
                        <p className="text-red-500 mt-1 text-sm">{errors.displayName.message}</p>
                    )}
                </div>

                <div className="my-4">
                    <Label>プロフィール画像</Label>
                    {/* 画像挿入処理 */}
                </div>

                <div className="my-4">
                    <Label>ユーザーID</Label>
                    <Input 
                    type="text" 
                    placeholder="abcd_1234" 
                    className="w-full" 
                    {...register("username")}
                    required />
                    {errors.username && (
                        <p className="text-red-500 mt-1 text-sm">{errors.username.message}</p>
                    )}
                    <p className="text-red-500 text-xs">URLの作成に必要です</p>
                </div>

                <div className="flex my-12 justify-center">
                    <Button type="submit" color="secondary" disabled={isSubmitting}>
                        {isSubmitting?"プロフィール作成中":"プロフィールの作成"}
                    </Button>
                </div>


            </form>
    )
}