//NGワード設定画面

import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import PageTitle from "@/shared/components/PageTitle";
import { DUMMY_NGWord } from "@/shared/types/types";


export default function SettingNGWord(){
    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>NGワード設定</PageTitle>
            <div className="w-full max-w-md flex  gap-2 pt-6">
                <Input type="text" className="flex-1"/>
                <Button>保存</Button>
            </div>
            <p className="text-xs text-red-300 pt-2">
                複数の単語を登録する場合は、1つ保存してから次の単語を入力してください
            </p>

            <div className="w-full max-w-3xl pt-6">
                <div className="flex  flex-wrap items-center gap-4">
                {DUMMY_NGWord.map((w)=>(
                    <div key={w.id} className="flex items-center gap-1 rounded-full bg-gray-100 px-4 py-2 text-sm">

                            <span>{w.word}</span>
                            <button 
                            className="flex justify-center items-center h-4 w-4 text-sm rounded-full bg-gray-300 text-white hover:bg-gray-200">
                                ×
                            </button>  

                 
                    </div>

                ))}
                </div>
            </div>

        </div>
    )
}