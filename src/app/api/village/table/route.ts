import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = parseInt(searchParams.get("month") ?? "0");
    const year = parseInt(searchParams.get("year") ?? "0");
    const slug = searchParams.get("slug") ?? "";
    const tableId = searchParams.get("tableId") ?? "";

    if (slug || year || month) {
      const data = await prisma.budgetPeriod.findFirst({
        where: {
          villageSlug: slug,
          year: year,
          month: month,
        },
        include: {
          BudgetItem: true,
        },
      });
      return NextResponse.json({
        data,
      });
    }

    if (tableId) {
      const data = await prisma.budgetPeriod.findFirst({
        where: {
          id: tableId,
        },
        include: {
          BudgetItem: true,
        },
      });
      return NextResponse.json({
        data,
      });
    }
  } catch (error) {
    console.error("Error fetching budget period:", error);
    return NextResponse.json(
      { error: "Failed to fetch budget data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, year, month, budgetItem = [], name } = body;
    if (!slug || !year || !month) {
      return NextResponse.json(
        { error: "Missing required fields: slug, year, month" },
        { status: 400 }
      );
    }
    const data = await prisma.budgetPeriod.create({
      data: {
        year,
        month,
        name,
        villageSlug: slug,
        BudgetItem: {
          create: budgetItem.map((item: any) => ({
            budgetAmount: item.budget || 0,
            realization: item.realization || 0,
            mainCategory: item.mainCategory,
            subCategory: item.subCategory,
            orderNumber: item.orderNumber,
            code: item.code,
          })),
        },
      },
      include: {
        BudgetItem: true,
      },
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error creating budget period:", error);
    return NextResponse.json(
      { error: "Failed to create budget data" },
      { status: 500 }
    );
  }
}

export async function UPDATE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, BudgetItem = [] } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    const data = await prisma.budgetPeriod.update({
      where: { id },
      data: {
        BudgetItem: {
          upsert: BudgetItem.map((item: any) => ({
            where: { id: item.id || undefined },
            create: {
              budgetAmount: item.budget || 0,
              realization: item.realization || 0,
              mainCategory: item.mainCategory,
              subCategory: item.subCategory,
              orderNumber: item.orderNumber,
              code: item.code,
            },
            update: {
              budgetAmount: item.budget || 0,
              realization: item.realization || 0,
              mainCategory: item.mainCategory,
              subCategory: item.subCategory,
              orderNumber: item.orderNumber,
              code: item.code,
            },
          })),
        },
      },
      include: {
        BudgetItem: true,
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error updating budget period:", error);
    return NextResponse.json(
      { error: "Failed to update budget data" },
      { status: 500 }
    );
  }
}
