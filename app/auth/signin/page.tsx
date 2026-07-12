//ログイン画面

import Button from "@/shared/components/Button";
import PageTitle from "@/shared/components/PageTitle";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./LoginForm";

export default function Signin(){
    return(
        
        
        <div className="m-5 flex flex-col items-center">
            <PageTitle>ログイン</PageTitle>

                <LoginForm />
            

            <div className="flex items-center w-full max-w-md my-5">
            <div className="flex-1 border-b border-gray-300" />
            <span className="mx-4 text-sm text-gray-500">
                または
            </span>
            <div className="flex-1 border-b border-gray-300" />
            </div>

            <div className="flex flex-col gap-5">
                <Button color="others"><FaXTwitter/>でログイン</Button>
                <Button color="others"><FcGoogle/>でログイン</Button>
            </div>
            
    
        </div>
            


        
    )
}