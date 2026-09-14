/*
  Warnings:

  - You are about to alter the column `price` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `BureauNational` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,zoneId]` on the table `OrganisationLocal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year]` on the table `PastPresident` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Zone` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zoneId]` on the table `ZonePresident` will be added. If there are existing duplicate values, this will fail.
  - Made the column `updatedAt` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organisationLocalId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_eventId_fkey";

-- DropForeignKey
ALTER TABLE "OrganisationLocal" DROP CONSTRAINT "OrganisationLocal_zoneId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- DropTable
DROP TABLE "File";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "EventImage" (
    "id" SERIAL NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventFile" (
    "id" SERIAL NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BureauNational_title_key" ON "BureauNational"("title");

-- CreateIndex
CREATE UNIQUE INDEX "OrganisationLocal_name_zoneId_key" ON "OrganisationLocal"("name", "zoneId");

-- CreateIndex
CREATE UNIQUE INDEX "PastPresident_year_key" ON "PastPresident"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_name_key" ON "Zone"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ZonePresident_zoneId_key" ON "ZonePresident"("zoneId");

-- AddForeignKey
ALTER TABLE "OrganisationLocal" ADD CONSTRAINT "OrganisationLocal_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organisationLocalId_fkey" FOREIGN KEY ("organisationLocalId") REFERENCES "OrganisationLocal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventImage" ADD CONSTRAINT "EventImage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventFile" ADD CONSTRAINT "EventFile_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
