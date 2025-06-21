"use server";
import { prisma } from "../lib/prisma"

export const updateBudgetItem = async (budgetItems: any[]) => {
  try {

    const result = await prisma.$transaction(
      budgetItems.map(item => 
        prisma.budgetItem.update({
          where: { id: item.id },
          data: {
            budget: item.budgetAmount,
            realization: item.realization
          }
        })
      )
    );
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error("Error updating budget items:", error);
    return {
      success: false,
      error: "Failed to update budget items"
    };
  }
}
