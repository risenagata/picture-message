//ログイン時にパスワードを忘れた人用の画面
import ResetPasswordForm from "./ResetPassword";






export default function resetPassword(){
    return(
        <div className="m-5 flex flex-col items-center"> 
                <ResetPasswordForm/>  
        </div>
    )
}