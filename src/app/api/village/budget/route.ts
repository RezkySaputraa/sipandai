import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") ?? "";

      const data = await prisma.budgetPeriod.findMany({
        where: {
          villageSlug: slug,
        },
      });
      return NextResponse.json({
        data,
      });
  } catch (error) {
    console.error("Error fetching budget period:", error);
    return NextResponse.json(
      { error: "Failed to fetch budget data" },
      { status: 500 }
    );
  }
}