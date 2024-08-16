/*
  Warnings:

  - Added the required column `bankAccountNumber` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `bankAccountNumber` VARCHAR(20) NOT NULL,
    ALTER COLUMN `address` DROP DEFAULT;
