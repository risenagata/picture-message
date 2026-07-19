'use client'

import { useRouter } from "next/navigation";
import Button from "./Button";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function LogoutButton(){
    const router=useRouter()
    const [isPending,setIsPending]=useState(false)

    const handleLogout=async()=>{
        setIsPending(true)

        const supabase=createClient()
        await supabase.auth.signOut()

        router.push("/auth/signin")
        router.refresh()

    }

    return(
        <Button color="danger" onClick={handleLogout}>
            {isPending?"ログアウト中．．．":"ログアウト"}
        </Button>
    )
}