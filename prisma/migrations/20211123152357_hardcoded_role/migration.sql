/*
  Warnings:

  - You are about to drop the column `roleId` on the `Personel` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Personel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Personel" DROP CONSTRAINT "Personel_roleId_fkey";

-- AlterTable
ALTER TABLE "Personel" DROP COLUMN "roleId",
ADD COLUMN     "role" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Role";
