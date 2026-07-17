import PageTitle from "@/shared/components/PageTitle";
import ProfileForm from "./ProfileForm";

export default function Onboarding(){
    return(
        <div className="m-5 flex flex-col items-center bg-gray-100 pt-8 rounded-lg shadow-sm">
            <PageTitle>プロフィール登録</PageTitle>
                <ProfileForm />
        </div>
    )
}