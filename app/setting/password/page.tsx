//パスワード変更画面

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import PageTitle from "@/shared/components/PageTitle";

export default function SettingPassword(){
    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>パスワード変更</PageTitle>
            <form className="w-full max-w-md">
                <div className="py-6">
                    <Label>新しいパスワード</Label>
                    <Input type="password" placeholder="英数字6文字以上" className="w-full"/>
                </div>
                <div className="py-6">
                    <Label>新しいパスワード（確認用）</Label>
                    <Input type="password" placeholder="英数字6文字以上" className="w-full"/>
                </div>

                
                <div className="flex flex-col justify-center items-center gap-4 pt-6">
                    <Button color="primary" className="w-full">保存</Button>
                    <Button color="secondary" className="w-full">キャンセル</Button>
                </div>

            </form>
        </div>
    )
}