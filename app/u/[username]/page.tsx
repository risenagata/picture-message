//メッセージ作成画面

import Button from "@/shared/components/Button";
import PageTitle from "@/shared/components/PageTitle";
import Textarea from "@/shared/components/Textarea";
import { DUMMY_profile } from "@/shared/types/types";
import { IoSendSharp } from "react-icons/io5";


export default function MessageCreate(){


    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>{DUMMY_profile.name}さんへメッセージを送る</PageTitle>
            <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                {/* imgやImage */}
            </div>
            <form className="w-full max-w-2xl flex flex-col gap-4 pt-4">
                <Textarea 
                placeholder="これからも応援しています！"
                className="flex-1 w-full max-w-2xl min-h-[300px]  p-4 text-lg"
                />
                
                <div className="w-full max-w-2xl flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <button
                        type="button" 
                        className="bg-white text-gray-500 rounded-full w-8 h-8 hover:bg-gray-300">
                            +
                        </button>
                        <p className="text-sm text-gray-500">キャンバスを追加する</p>                    
                    </div>

                    <Button>
                        <IoSendSharp />
                        送信
                    </Button>
                </div>

            </form>
            
            
            
        </div>
    )
}