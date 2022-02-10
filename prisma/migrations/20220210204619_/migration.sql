/*
  Warnings:

  - You are about to drop the `ClientMedication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicationDose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicationInventory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientMedication" DROP CONSTRAINT "ClientMedication_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ClientMedication" DROP CONSTRAINT "ClientMedication_medicationInventoryId_fkey";

-- DropForeignKey
ALTER TABLE "MedicationDose" DROP CONSTRAINT "MedicationDose_clientMedicationId_fkey";

-- DropTable
DROP TABLE "ClientMedication";

-- DropTable
DROP TABLE "MedicationDose";

-- DropTable
DROP TABLE "MedicationInventory";

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportRevision" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "reportId" INTEGER NOT NULL,
    "editorId" TEXT NOT NULL,

    CONSTRAINT "ReportRevision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportRevision" ADD CONSTRAINT "ReportRevision_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportRevision" ADD CONSTRAINT "ReportRevision_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Personel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
