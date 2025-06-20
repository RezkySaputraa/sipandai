/*
  Warnings:

  - Added the required column `kabupaten` to the `Village` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kecamatan` to the `Village` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinsi` to the `Village` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Village" ADD COLUMN     "kabupaten" TEXT NOT NULL,
ADD COLUMN     "kecamatan" TEXT NOT NULL,
ADD COLUMN     "provinsi" TEXT NOT NULL;
