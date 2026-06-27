//新規登録画面

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Label from "@/shared/components/Label";
import PageTitle from "@/shared/components/PageTitle";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function Signup(){
    return(
        
        
        <div className="m-5 flex flex-col items-center">
            <PageTitle>新規登録</PageTitle>
            <form className="w-full max-w-md">
                <div>
                <Label>メールアドレス</Label>
                <Input 
                type="email" 
                placeholder="example@mail.com"
                className="w-full"
                />
            
            </div>
            {/* <div className="mt-4">
                <Label>パスワード</Label>
                <Input 
                type="password" 
                placeholder="6文字以上の英数字"
                className="w-full"
                />
            
            </div> */}

            <div className="flex justify-center py-4">
                <Button type="submit" color="primary">登録</Button>
            </div>


            </form>
            

            <div className="flex items-center w-full max-w-md my-5">
            <div className="flex-1 border-b border-gray-300" />
            <span className="mx-4 text-sm text-gray-500">
                または
            </span>
            <div className="flex-1 border-b border-gray-300" />
            </div>

            <div className="flex flex-col gap-5">
                <Button color="others"><FaXTwitter/>で登録</Button>
                <Button color="others"><FcGoogle/>で登録</Button>
            </div>
            
    
        </div>
            


        
    )
}