// メール認証後にsupabaseから送られてくる情報を受け取り、ログイン状態を作る

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server";

export async function GET(request:Request){
    
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");


    //リンク無効・期限切れエラー
    if(error){
        return NextResponse.redirect(
            new URL(`/setting/email?error=${error}`, origin)
        )
    }


    if(code){
        const supabase=await createClient()

        const {error:exchangeError} =await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) {
            console.error("exchange失敗:",exchangeError)
        return NextResponse.redirect(new URL("/auth/signin", origin));
        }
        


        const {
        data: { user },
        } = await supabase.auth.getUser();



        if(!user){
        return NextResponse.redirect(
        new URL("/auth/signin", origin)
        );
        }


        const next = searchParams.get("next") ?? "/mypage";

        // supabaseで変更したメールアドレスをprismaにも同期させる（Userテーブルにemailがあるので）
        if(next.startsWith("/setting")){
            await prisma.user.update({
                where:{id:user.id},
                data:{email:user.email}
            })
        }

        return NextResponse.redirect(
            new URL(`${next}?verified=1`,origin)
        )

  
        
        
    }


    return NextResponse.redirect(
    new URL("/auth/signin",origin)
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
// onboardingまたはSettingへ