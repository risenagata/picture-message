//NGワード設定画面

import { prisma } from "@/lib/prisma";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import PageTitle from "@/shared/components/PageTitle";
import addNGWord, { deleteWord } from "./action";



export default async function SettingNGWord(){

    const NGWords=await prisma.nGWord.findMany({
        where:{
            userId:"1",
        }
    })
    

    return(
        <div className="m-5 flex flex-col items-center">
            <PageTitle>NGワード設定</PageTitle>
            <form action={addNGWord} className="w-full max-w-md flex  gap-2 pt-6">
                <Input type="text" name="word" className="flex-1"/>
                <Button type="submit">保存</Button>
            </form>
            <p className="text-xs text-red-300 pt-2">
                複数の単語を登録する場合は、1つ保存してから次の単語を入力してください
            </p>

            <div className="w-full max-w-3xl pt-6">
                <div className="flex  flex-wrap items-center gap-4">
                {NGWords.map((w)=>(
                    <div key={w.id} className="flex items-center gap-1 rounded-full bg-gray-100 px-4 py-2 text-sm">

                            <span>{w.word}</span>
                            <form action={deleteWord}>
                                <input type="hidden"
                                name="id"
                                value={w.id}
                                />
                                <button 
                                className="flex justify-center items-center h-4 w-4 text-sm rounded-full bg-gray-300 text-white hover:bg-gray-200">
                                    ×
                                </button> 
                            </form>
                             

                 
                    </div>

                ))}
                </div>
            </div>

        </div>
    )
}