/*
  Warnings:

  - Added the required column `country` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `country` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Subscription` ALTER COLUMN `startDate` DROP DEFAULT;
