

import { TextareaHTMLAttributes} from "react"
import { twMerge } from "tailwind-merge"

type TextareaProps=TextareaHTMLAttributes<HTMLTextAreaElement>


export default function Textarea({className,...props}:TextareaProps){
    


    return(

        <textarea 
        {...props}
        className={twMerge("border rounded bg-white",className)}

        />

    )

}