-- AlterTable
ALTER TABLE "Laporan" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'draft';
