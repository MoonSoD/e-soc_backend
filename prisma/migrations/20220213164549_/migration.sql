-- DropIndex
DROP INDEX "Report_date_key";

-- AlterTable
ALTER TABLE "ReportRevision" ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
