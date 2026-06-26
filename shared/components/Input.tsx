import { InputHTMLAttributes } from "react";

type InputProps=InputHTMLAttributes<HTMLInputElement>

export default function Input({className,...props}:InputProps){
    return(

            <input 
            {...props}
            className={`border py-2 px-3 rounded-lg bg-white ${className}`}
            />


    )
}