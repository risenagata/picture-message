//新規登録画面

import Button from "@/shared/components/Button";
import PageTitle from "@/shared/components/PageTitle";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import SignupForm from "./SignupForm";

export default function Signup(){
    return(
        
        
        <div className="m-5 flex flex-col items-center">
            <PageTitle>新規登録</PageTitle>
            
                <SignupForm />
            

            <div className="flex items-center w-full max-w-md my-5">
            <div className="flex-1 border-b border-gray-300" />
            <span className="mx-4 text-sm text-gray-500">
                または
            </span>
            <div className="flex-1 border-b border-gray-300" />
            </div>

            <div className="flex flex-col gap-5 items-center">
                <Button color="others"><FaXTwitter/>X(Twitter)でアカウント作成</Button>
                <Button color="others"><FcGoogle/>Googleでアカウント作成</Button>
            </div>
            
    
        </div>
            


        
    )
}