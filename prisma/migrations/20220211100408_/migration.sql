/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Made the column `content` on table `ReportRevision` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ReportRevision" ALTER COLUMN "content" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Report_date_key" ON "Report"("date");
