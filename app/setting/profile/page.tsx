//名前の変更画面

import { prisma } from "@/lib/prisma";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import PageTitle from "@/shared/components/PageTitle";
import { updateDisplayName } from "./action";
import Link from "next/link";

export default async function SettingName(){

 const user =await prisma.user.findFirst()

    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>名前の変更</PageTitle>
            <form action={updateDisplayName} className="w-full max-w-md">
                <div className="py-6">
                    <Label>現在の名前</Label>
                    <p className="mt-2 text-gray-500">{user?.displayName}</p>
                </div>
                <div className="py-6">
                    <Label>変更後の名前</Label>
                    <Input name="displayName" type="text" className="w-full" />
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