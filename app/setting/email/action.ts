'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function updateEmail(formData:FormData){
    const email=formData.get("email") as string

    const user=await prisma.user.findFirst()
    if(!user) return

    await prisma.user.update({
        where: {
        id: user.id,
        },
        data: {
        email,
        },
    });

    revalidatePath('/','layout')
    redirect('/setting')

    
}