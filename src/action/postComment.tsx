
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function postComment({
  text,
  userId,
  villageId,
}: {
  text: string;
  userId: string;
  villageId: string;
}) {
  try {
    await prisma.comment.create({
      data: {
        text,
        userId,
        villageId: villageId,
      },
    });
    const village = await prisma.village.findFirst({
        where: {
            id: villageId,
        },
    })
    
    if (village && village.slug) {
      revalidatePath(`/village/${village.slug}`);
    } else {
      revalidatePath('/villages');
    }
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Gagal menambahkan komentar." };
  }
}