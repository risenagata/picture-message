'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function updateDisplayName(formData: FormData) {
  const displayName = formData.get("displayName") as string;

  const user = await prisma.user.findFirst();

  if (!user) return;

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      displayName,
    },
  });

  revalidatePath('/','layout')
  redirect('/setting')
}