import PageTitle from "@/shared/components/PageTitle";
import SettingImageForm from "./SettingImageForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function SettingImage(){
    const supabase=await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if(!user){
        redirect("/auth/signin")
    }

    const profile = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });
    if(!profile){
        redirect("/onboarding")
    }

    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>プロフィール画像変更</PageTitle>
                <SettingImageForm avatarUrl={profile.avatarUrl} />
        </div>
    )
}