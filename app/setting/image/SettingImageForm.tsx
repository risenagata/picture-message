'use client'
import Button from "@/shared/components/Button";
import Link from "next/link";

type Props={
    avatarUrl:string | null
}

export default async function SettingImageForm({avatarUrl}:Props){


    return(
        <div className="w-full max-w-md pt-6">
            <div className="flex flex-col items-center gap-4">
                <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                    <img src="" alt="ユーザー画像" className="h-full w-full object-cover" />

                </div>
                <input type="file" className="hidden"/>

                <Button color="primary" className="w-full">保存</Button>
                <Link href="/setting" className="w-full">
                    <Button color="secondary" className="w-full">キャンセル</Button>
                </Link>

            </div>

        </div>
    )
}