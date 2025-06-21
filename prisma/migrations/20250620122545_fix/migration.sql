/*
  Warnings:

  - You are about to drop the column `villageId` on the `BudgetItem` table. All the data in the column will be lost.
  - Added the required column `budgetPeriodId` to the `BudgetItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetItem" DROP CONSTRAINT "BudgetItem_villageId_fkey";

-- AlterTable
ALTER TABLE "BudgetItem" DROP COLUMN "villageId",
ADD COLUMN     "budgetPeriodId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "budgetPeriod" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "villageSlug" TEXT NOT NULL,

    CONSTRAINT "budgetPeriod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "budgetPeriod" ADD CONSTRAINT "budgetPeriod_villageSlug_fkey" FOREIGN KEY ("villageSlug") REFERENCES "Village"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_budgetPeriodId_fkey" FOREIGN KEY ("budgetPeriodId") REFERENCES "budgetPeriod"("id") ON DELETE CASCADE ON UPDATE CASCADE;
