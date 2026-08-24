//ログイン画面


import PageTitle from "@/shared/components/PageTitle";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default function Signin(){
    return(
        
        
        <div className="m-5 flex flex-col items-center">
            <PageTitle>ログイン</PageTitle>

                <LoginForm />


            <div className="w-full max-w-md h-sm flex justify-center mt-6">
                <Link href="/auth/reset-password">
                    <p className="text-gray-500 text-lg hover:text-gray-700">＜パスワードを忘れた方はこちら＞</p>                
                </Link>
            </div>

            
        </div>
                    
    )
}