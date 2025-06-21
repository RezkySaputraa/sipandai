/*
  Warnings:

  - Added the required column `name` to the `budgetPeriod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "budgetPeriod" ADD COLUMN     "name" TEXT NOT NULL;
