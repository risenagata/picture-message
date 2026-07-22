// メール認証後にsupabaseから送られてくる情報を受け取り、ログイン状態を作る

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server";

export async function GET(request:Request){
    const {searchParams}=new URL(request.url)
    console.log("searchParams:",searchParams.toString());

    const code =searchParams.get("code")

    if(code){
        const supabase=await createClient()

        const {error} =await supabase.auth.exchangeCodeForSession(code)
        if (error) {
        return NextResponse.redirect(
            new URL("/auth/signin", request.url)
        );
    }


        const {
        data: { user },
        } = await supabase.auth.getUser();

        if(!user){
        return NextResponse.redirect(
        new URL("/auth/signin", request.url)
        );
        }

        const next = searchParams.get("next") ?? "/mypage";

        // supabaseで変更したメールアドレスをprismaにも同期させる（Userテーブルにemailがあるので）
        if (next === "/setting/email") {
        await prisma.user.update({
            where: {
            id: user.id,
            },
            data: {
            email: user.email!,
            },
        });
        }

        return NextResponse.redirect(
        new URL(next,request.url)
        );
        
        
    }


    




}

// 確認メール
// ↓
// URLクリック
// ↓
// /auth/route.ts
// ↓
// supabaseよりユーザー情報取得
// ↓
// セッション作成
// ↓
// onboardingまたはSettingへ