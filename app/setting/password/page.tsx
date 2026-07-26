//パスワード変更画面


import PageTitle from "@/shared/components/PageTitle";
import SettingPasswordForm from "./SettingPasswordForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingPassword(){

        const supabase=await createClient()
        const { data: { user } } = await supabase.auth.getUser();
        if(!user){
            redirect("/auth/signin")
        }

    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>パスワード変更</PageTitle>

                <SettingPasswordForm />

        </div>
    )
}