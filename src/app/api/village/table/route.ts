import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function get(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const village = searchParams.get("village") ?? "bati-bati";
    const month = parseInt(searchParams.get("month") ?? "2") ?? 1;
    const year = parseInt(searchParams.get("year") ?? "2025") ?? 2025;
    
    await prisma.budgetPeriod.findFirst({
        where:
        {
            villageSlug:village,
            month:Number(month),
            year:Number(year),
        }   
    })
  } catch {}
}


export async function POST(request: NextRequest) {
  try {
    
    const { searchParams } = new URL(request.url);
    const village = searchParams.get("village") ?? "";
    const month = searchParams.get("month") ?? 1;
    const year = searchParams.get("year") ?? 2025;
    
    await prisma.budgetPeriod.findFirst({
       where:
        {
            villageSlug:village,
            month:Number(month),
            year:Number(year),
        } 
    })
  } catch {}
}
