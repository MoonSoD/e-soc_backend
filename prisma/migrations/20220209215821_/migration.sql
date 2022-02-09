/*
  Warnings:

  - You are about to drop the column `clientFamilyMemberId` on the `Visitation` table. All the data in the column will be lost.
  - You are about to drop the `ClientFamilyMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateTime` to the `Visitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Visitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientFamilyMember" DROP CONSTRAINT "ClientFamilyMember_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Visitation" DROP CONSTRAINT "Visitation_clientFamilyMemberId_fkey";

-- AlterTable
ALTER TABLE "Visitation" DROP COLUMN "clientFamilyMemberId",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL;

-- DropTable
DROP TABLE "ClientFamilyMember";
