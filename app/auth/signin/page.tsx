//ログイン画面

// import Button from "@/shared/components/Button";
import PageTitle from "@/shared/components/PageTitle";
// import { FaXTwitter } from "react-icons/fa6";
// import { FcGoogle } from "react-icons/fc";
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
            

            {/* <div className="flex items-center w-full max-w-md my-5">
                <div className="flex-1 border-b border-gray-300" />
                <span className="mx-4 text-sm text-gray-500">
                    または
                </span>
                <div className="flex-1 border-b border-gray-300" />
            </div>

            <div className="flex flex-col gap-5 items-center">
                <Button color="others"><FaXTwitter/>X(Twitter)でログイン</Button>
                <Button color="others"><FcGoogle/>Googleでログイン</Button>
            </div> */}
            
    
        </div>
            


        
    )
}