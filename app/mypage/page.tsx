//マイページ

import Button from "@/shared/components/Button";
import Copy from "@/shared/components/Copy";
import Label from "@/shared/components/Label";
import PageTitle from "@/shared/components/PageTitle";
import { DUMMY_profile } from "@/shared/types/types";




export default function Mypage(){
    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>マイページ</PageTitle>
            
            <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                {/* imgやImage */}
            </div>
 

            <div className="w-full max-w-md">
                <div className="mt-4">
                    <Label>名前</Label>
                    <p>{DUMMY_profile.name}</p>
                </div>
                <div className="mt-4">
                    <Label>ユーザーID</Label>
                    <p>{DUMMY_profile.username}</p>
                </div>
                <div className="mt-4" >
                    <Label>メールアドレス</Label>
                    <p>{DUMMY_profile.email}</p>
                </div>
                <div className="mt-4">
                    <Label>アカウント</Label>
                    <p>{DUMMY_profile.account}</p>
                </div>
                <div className="my-4">
                    <Label>マイURL</Label>

                        <div className="flex items-center gap-4">
                            <p className="border-b-1">{DUMMY_profile.myURL}</p>
                            <Copy />
                        </div>

                        {/* トースト通知実装忘れずに */}

                    
                </div>

            </div>
            
            <div className="p-8">
                <Button color="danger">ログアウト</Button>
            </div>


        </div>
        
    )
}