// メール認証後にsupabaseから送られてくる情報を受け取り、ログイン状態を作る

import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server";

export async function GET(request:Request){
    const {searchParams}=new URL(request.url)

    const code =searchParams.get("code")

    if(code){
        const supabase=await createClient()

        await supabase.auth.exchangeCodeForSession(code)


        const {
        data: { user },
        } = await supabase.auth.getUser();

    }

    return NextResponse.redirect(
    new URL("/onboarding", request.url)
    );

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
// onboardingへ