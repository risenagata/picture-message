//新規登録画面

// import Button from "@/shared/components/Button";
import PageTitle from "@/shared/components/PageTitle";
// import { FaXTwitter } from "react-icons/fa6";
// import { FcGoogle } from "react-icons/fc";
import SignupForm from "./SignupForm";

export default function Signup(){
    return(
        
        
        <div className="m-5 flex flex-col items-center">
            <PageTitle>新規登録</PageTitle>
            
                <SignupForm />
            
    
        </div>
        
    )
}