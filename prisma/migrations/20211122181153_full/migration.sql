/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Client_id_seq";

-- CreateTable
CREATE TABLE "Personel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "sex" VARCHAR(1) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Personel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "display" VARCHAR(16) NOT NULL,
    "pavilon" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "max_capacity" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitation" (
    "id" SERIAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientFamilyMemberId" TEXT NOT NULL,

    CONSTRAINT "Visitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientFamilyMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "ClientFamilyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicationDose" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "medicationId" INTEGER NOT NULL,

    CONSTRAINT "MedicationDose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicationInventory" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "medicationId" INTEGER NOT NULL,

    CONSTRAINT "MedicationInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(16) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personel_email_key" ON "Personel"("email");

-- AddForeignKey
ALTER TABLE "Personel" ADD CONSTRAINT "Personel_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitation" ADD CONSTRAINT "Visitation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitation" ADD CONSTRAINT "Visitation_clientFamilyMemberId_fkey" FOREIGN KEY ("clientFamilyMemberId") REFERENCES "ClientFamilyMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientFamilyMember" ADD CONSTRAINT "ClientFamilyMember_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationDose" ADD CONSTRAINT "MedicationDose_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationInventory" ADD CONSTRAINT "MedicationInventory_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
