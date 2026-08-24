
import PageTitle from "@/shared/components/PageTitle";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const settingItems = [
  { title: "名前の変更", href: "/setting/profile" },
  { title: "プロフィール画像の変更", href: "/setting/image" },
  { title: "ユーザーIDの変更", href: "/setting/username" },
  { title: "メールアドレスの変更", href: "/setting/email" },
  { title: "パスワードの変更", href: "/setting/password" },
  { title: "NGワード設定", href: "/setting/ngwords" },
];

export default async function Setting(){
    const supabase=await createClient()
    const {data:{user}}=await supabase.auth.getUser()
    if(!user){
            redirect("/auth/signin")
    }
    
    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>設定</PageTitle>

            <div className="flex flex-col py-2">
                {settingItems.map((item)=>(
                    <Link key={item.href} href={item.href} 
                    className="block border-b border-gray-300 px-4 py-5 hover:bg-gray-100">
                        {item.title}
                    </Link>
                ))}


            </div>

        </div>
    )
}