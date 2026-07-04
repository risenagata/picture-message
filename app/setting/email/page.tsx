//メールアドレスの変更

import { prisma } from "@/lib/prisma";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import PageTitle from "@/shared/components/PageTitle";
import updateEmail from "./action";
import Link from "next/link";

export default async function SettingEmail(){
    const user=await prisma.user.findFirst()
    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>メールアドレスの変更</PageTitle>
            <form action={updateEmail} className="w-full max-w-md">
                <div className="py-6">
                    <Label>現在のメールアドレス</Label>
                    <p className="mt-2 text-gray-500">{user?.email}</p>
                </div>
                <div className="py-6">
                    <Label>変更後のメールアドレス</Label>
                    <Input type="email" name="email" className="w-full" />
                </div>            

                <div className="flex flex-col justify-center items-center gap-4 pt-6">
                    <Button type="submit" color="primary" className="w-full">保存</Button>
                    <Link href="/setting" className="w-full">
                        <Button color="secondary" className="w-full">キャンセル</Button>
                    </Link>
                    
                </div>
            </form>
        </div>
    )
}