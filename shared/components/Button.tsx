import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const buttonVariants=tv({
    base:'w-fit py-2 px-4 rounded-full inline-flex items-center justify-center gap-2 active:scale-90 hover:cursor-pointer',
    variants:{
        color:{
            primary:'bg-yellow-500 text-white hover:bg-yellow-300',
            secondary:'bg-white text-yellow-500 border border-yellow-500 hover:text-yellow-300',
            danger:'bg-red-500 text-white hover:bg-red-700',
            black:'bg-black text-white hover:bg-gray-700',
            others:'bg-white border hover:bg-gray-200'
        },

    },
    defaultVariants:{
        color:'primary'
    }
})

type ButtonProps=
    ButtonHTMLAttributes<HTMLButtonElement>&
{
    children:React.ReactNode,
    type?: 'button' | 'submit' | 'reset';
    color?: 'primary' | 'secondary' | 'danger' | 'black'| 'others';
    className?:string
}

export default function Button({children,type='button',color,className,...props}:ButtonProps){
    return(
    <button {...props} className={twMerge(buttonVariants({ color }),className)} type={type}>
      {children}
    </button>
    )

}