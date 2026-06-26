//メッセージ詳細

import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { DUMMY_messages } from "@/shared/types/types";
import { FaXTwitter } from "react-icons/fa6";




export default async function MessageDetail({
  params
}:{
  params:Promise<{id:string}>
}) {

  const {id}=await params

  const message=DUMMY_messages.find((m)=>m.id===id)



  if(!message){
    return(
      <div className="m-5 flex justify-center items-center">
        <p className="text-gray-500">メッセージが見当たりません</p>

      </div>
    )
  }

  return (
    <div className="m-5 flex flex-col items-center gap-4">

      <Card className="w-full max-w-2xl bg-white">
        {message.content && (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}

      </Card>
      
      <p className="text-xs text-gray-500">このメッセージをXで返信できます</p>
      <Button color="black">
        <FaXTwitter/>
        で返信する
      </Button>
    </div>
    
  );
}