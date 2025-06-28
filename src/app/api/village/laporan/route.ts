import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      const data = await prisma.laporan.findMany({
        include: {
          village: true,
        },
      });
      return NextResponse.json({
        data,
      });
    }
    const data = await prisma.laporan.findMany({
      include: {
        village: true,
      },
      where: {
        user: {
          id: userId,
        },
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
