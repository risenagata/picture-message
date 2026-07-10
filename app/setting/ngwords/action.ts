'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export default async function addNGWord(formData:FormData){

    const word=(formData.get('word') as string).trim()
    if (!word) return

    const user=await prisma.user.findFirst()
    if(!user) return

    const exists=await prisma.nGWord.findFirst({
        where:{
            userId:user.id,
            word
        }
    })
    if(exists)return

    await prisma.nGWord.create({
        data:{
            userId:user.id,
            word
        }
    })

    revalidatePath("/setting/ngwords")


}


export async function deleteWord(formData:FormData) {
    const id=formData.get("id") as string
    await prisma.nGWord.delete({
        where:{id}
    })

    revalidatePath("/setting/ngwords")
    
}