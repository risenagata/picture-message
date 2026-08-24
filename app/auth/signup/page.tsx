//新規登録画面


import PageTitle from "@/shared/components/PageTitle";
import SignupForm from "./SignupForm";

export default function Signup(){
    return(
        
        
        <div className="m-5 flex flex-col items-center">
            <PageTitle>新規登録</PageTitle>
            
                <SignupForm />
            
    
        </div>
        
    )
}