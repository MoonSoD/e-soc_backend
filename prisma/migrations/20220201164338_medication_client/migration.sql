/*
  Warnings:

  - You are about to drop the column `medicationId` on the `MedicationInventory` table. All the data in the column will be lost.
  - You are about to drop the `Medication` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `suklId` to the `MedicationInventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_clientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicationDose" DROP CONSTRAINT "MedicationDose_medicationId_fkey";

-- DropForeignKey
ALTER TABLE "MedicationInventory" DROP CONSTRAINT "MedicationInventory_medicationId_fkey";

-- AlterTable
ALTER TABLE "MedicationInventory" DROP COLUMN "medicationId",
ADD COLUMN     "suklId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Medication";

-- CreateTable
CREATE TABLE "ClientMedication" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "ClientMedication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientMedication" ADD CONSTRAINT "ClientMedication_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationDose" ADD CONSTRAINT "MedicationDose_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "ClientMedication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
