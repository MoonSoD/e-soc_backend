/*
  Warnings:

  - Made the column `clientId` on table `ClientMedication` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ClientMedication" DROP CONSTRAINT "ClientMedication_clientId_fkey";

-- AlterTable
ALTER TABLE "ClientMedication" ALTER COLUMN "clientId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ClientMedication" ADD CONSTRAINT "ClientMedication_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
