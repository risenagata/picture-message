import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/setting";

  if (!token_hash || !type) {
    return NextResponse.redirect(new URL("/auth/signin", origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash });

  if (error) {
    console.error("verifyOtp失敗:", error);
    return NextResponse.redirect(new URL("/auth/signin", origin));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/signin", origin));
  }

  // メール変更時のみ Prisma 同期
  if (type === "email_change" || next.startsWith("/setting")) {
    await prisma.user.update({
      where: { id: user.id },
      data: { email: user.email! },
    });
  }

  return NextResponse.redirect(new URL(`${next}?verified=1`, origin));
}