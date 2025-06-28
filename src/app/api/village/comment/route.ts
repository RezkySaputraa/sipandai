import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") ?? "";

    const data = await prisma.comment.findMany({
      where: { villageId: id },
      include: { user: true },
      orderBy: { createdAt: "desc" },
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
