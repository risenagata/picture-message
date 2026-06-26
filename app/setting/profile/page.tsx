//名前の変更画面

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import PageTitle from "@/shared/components/PageTitle";
import { DUMMY_profile } from "@/shared/types/types";

export default function SettingName(){
    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>名前の変更</PageTitle>
            <form className="w-full max-w-md">
                <div className="py-6">
                    <Label>現在の名前</Label>
                    <p className="mt-2 text-gray-500">{DUMMY_profile.name}</p>
                </div>
                <div className="py-6">
                    <Label>変更後の名前</Label>
                    <Input type="text" className="w-full" />
                </div>            

                <div className="flex flex-col justify-center items-center gap-4 pt-6">
                    <Button color="primary" className="w-full">保存</Button>
                    <Button color="secondary" className="w-full">キャンセル</Button>
                </div>
            </form>



        </div>
    )
}