//名前の変更画面

import { prisma } from "@/lib/prisma";
import PageTitle from "@/shared/components/PageTitle";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SettingNameForm from "./SettingNameForm";

export default async function SettingName(){

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

    if (!profile) {
        redirect("/onboarding");
    }
 

    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>名前の変更</PageTitle>

            <SettingNameForm displayName={profile.displayName} />
        
        </div>
    )
}