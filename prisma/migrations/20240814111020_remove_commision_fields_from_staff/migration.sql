/*
  Warnings:

  - You are about to drop the column `commissionAmount` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `commissionType` on the `Staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Staff` DROP COLUMN `commissionAmount`,
    DROP COLUMN `commissionType`,
    ALTER COLUMN `currencyId` DROP DEFAULT;
