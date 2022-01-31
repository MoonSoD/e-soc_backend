/*
  Warnings:

  - Added the required column `password` to the `Personel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "roomId" INTEGER,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Personel" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "pavilon" SET DEFAULT 1,
ALTER COLUMN "level" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
