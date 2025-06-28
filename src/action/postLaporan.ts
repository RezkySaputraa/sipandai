"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PostLaporan({
  title,
  year,
  month,
  villageSlug,
  description,
  userId ,
}: {
  title: string;
  villageSlug: string;
  year: number;
  month: number;
  description: string;
  userId :string;
}) {
  try {
    const laporan = await prisma.laporan.create({
      data: {
        title: title,
        year,
        month,
        village:{
            connect:{
                slug: villageSlug,
            }
        },
        user: {
            connect: {
                id: userId,
            }
        },
        description,
      },
    });
    console.log("Laporan created:", laporan);
    revalidatePath(`/village/${villageSlug}`);

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Gagal menambahkan komentar." };
  }
}
