/*
  Warnings:

  - You are about to drop the column `medicationId` on the `MedicationDose` table. All the data in the column will be lost.
  - The primary key for the `MedicationInventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MedicationInventory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientMedication" DROP CONSTRAINT "ClientMedication_medicationInventoryId_fkey";

-- AlterTable
ALTER TABLE "ClientMedication" ALTER COLUMN "medicationInventoryId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MedicationDose" DROP COLUMN "medicationId";

-- AlterTable
ALTER TABLE "MedicationInventory" DROP CONSTRAINT "MedicationInventory_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "MedicationInventory_pkey" PRIMARY KEY ("suklId");

-- AddForeignKey
ALTER TABLE "ClientMedication" ADD CONSTRAINT "ClientMedication_medicationInventoryId_fkey" FOREIGN KEY ("medicationInventoryId") REFERENCES "MedicationInventory"("suklId") ON DELETE RESTRICT ON UPDATE CASCADE;
