import PageTitle from "@/shared/components/PageTitle";
import UpdatePasswordForm from "./updatePasswordForm";

// パスワード再設定のメール入力フォームでresetPasswordForEmailを使っているので
// メールのURLから入った人用のセッションを作っているので、ここでgetUser()は必須ではない

export default function UpdatePassWord(){
    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>パスワード変更</PageTitle>
        
            <UpdatePasswordForm />
        
        </div>
    )
}