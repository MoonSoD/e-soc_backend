/*
  Warnings:

  - You are about to drop the column `name` on the `ClientMedication` table. All the data in the column will be lost.
  - Added the required column `medicationInventoryId` to the `ClientMedication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MedicationDose" DROP CONSTRAINT "MedicationDose_medicationId_fkey";

-- AlterTable
ALTER TABLE "ClientMedication" DROP COLUMN "name",
ADD COLUMN     "medicationInventoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MedicationDose" ADD COLUMN     "clientMedicationId" INTEGER;

-- AddForeignKey
ALTER TABLE "ClientMedication" ADD CONSTRAINT "ClientMedication_medicationInventoryId_fkey" FOREIGN KEY ("medicationInventoryId") REFERENCES "MedicationInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationDose" ADD CONSTRAINT "MedicationDose_clientMedicationId_fkey" FOREIGN KEY ("clientMedicationId") REFERENCES "ClientMedication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
