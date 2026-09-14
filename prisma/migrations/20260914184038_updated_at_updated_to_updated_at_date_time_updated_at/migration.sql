/*
  Warnings:

  - Made the column `updatedAt` on table `BureauNational` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `OrganisationLocal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `OrganisationLocalContent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `PastPresident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Zone` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `ZonePresident` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BureauNational" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrganisationLocal" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrganisationLocalContent" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "PastPresident" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Zone" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "ZonePresident" ALTER COLUMN "updatedAt" SET NOT NULL;
