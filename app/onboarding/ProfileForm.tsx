'use client'

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import createProfileAction from "./action";
import z from "zod";
import { useRouter } from "next/navigation";


const profileSchema=z.object({
    displayName:z
    .string()
    .min(1,"1文字以上で入力してください")
    .max(50,"50文字以内で入力してください"),

    username:z
    .string()
    .min(3,"3文字以上で入力してください")
    .max(20,"20文字以内で入力してください")
    .regex(/^[a-zA-Z0-9_]+$/,"半角英数字とアンダースコア(_)のみ使用できます")
})

export type ProfileFormValues=z.infer<typeof profileSchema>

export default function ProfileForm(){
    const router=useRouter()

    const createProfile = async (data: ProfileFormValues) => {
        const formData = new FormData();

        formData.append("displayName", data.displayName);
        formData.append("username", data.username);

        const result = await createProfileAction(
                {
                success: false,
                message: "",
                },
                formData
            );

        if (result.success) {
            toast.success(result.message)
            router.push("/mypage")
            return
        }
        toast.error(result.message)

        if(result.message==="ログインしてください"){
            router.push("/auth/signin")
        }
        if (result.message === "プロフィールは登録済みです") {
        router.push("/mypage");
        }
    };



    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<ProfileFormValues>({
        resolver:zodResolver(profileSchema),
        defaultValues:{
            displayName:"",
            username:""
        }
    })



    return(
            <form className="w-full max-w-md" onSubmit={handleSubmit(createProfile)}>
                <div className="my-4">
                    <Label>名前</Label>
                    <Input 
                    type="text" 
                    placeholder="メッセさん" 
                    className="w-full"
                    {...register("displayName")}
                    />
                    {errors.displayName && (
                        <p className="text-red-500 mt-1 text-sm">{errors.displayName.message}</p>
                    )}
                </div>


                <div className="my-4">
                    <Label>ユーザーID</Label>
                    <Input 
                    type="text" 
                    placeholder="abcd_1234" 
                    className="w-full" 
                    {...register("username")}
                    />
                    {errors.username && (
                        <p className="text-red-500 mt-1 text-sm">{errors.username.message}</p>
                    )}
                    <p className="text-red-500 text-xs">URLの作成に必要です</p>
                </div>

                <div className="flex my-12 justify-center">
                    <Button type="submit" color="secondary" disabled={isSubmitting}>
                        {isSubmitting?"プロフィール作成中・・・":"プロフィールの作成"}
                    </Button>
                </div>


            </form>
    )
}

// ～全体の流れ～
// 入力
//  ↓
// react-hook-form
//  ↓
// Zod
//  ↓
// handleSubmit(createProfile)
//  ↓
// createProfile (ProfileForm)
//  ↓
// FormData作成
//  ↓
// createProfileAction(action.ts)
//  ↓
// Supabaseでログインユーザー取得
//  ↓
// Prismaでusername重複チェック
//  ↓
// Prismaで保存
//  ↓
// 結果を返す
//  ↓
// toast表示