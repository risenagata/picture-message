'use client'
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import addNGWord from "./action";
import { MAX_NGWords, NGWordForm} from "@/shared/types/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


type Props={
    ngWords:{
        id:string,
        word:string
    }[]
}





export default function SettingNgWordForm({ngWords}:Props){

    const canAdd=ngWords.length < MAX_NGWords

    const {register,handleSubmit,reset}=useForm<NGWordForm>({
        defaultValues:{
            word:""
        }
    })

    const addWord=async(data:NGWordForm)=>{
        const formData = new FormData();
        formData.append("word", data.word);

        const result=await addNGWord({
            success:false,
            message:""
        },
        formData
        )

        if(result.success){
            reset()
        }else{
            toast.error(result.message)
        }

    }

    return(
        <div>
            <form onSubmit={handleSubmit(addWord)} className="w-full max-w-md flex  gap-2 pt-6">
                <Input 
                type="text" 
                className="flex-1"
                {...register("word")}
                />
                <Button type="submit" disabled={!canAdd}>保存</Button>
                        
            </form>
        {/* {!canAdd &&(<p className="text-red-500 text-sm">NGワードは{MAX_NGWords}件まで登録できます</p>)} */}
        </div>



    )
}