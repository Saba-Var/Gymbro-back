/*
  Warnings:

  - Added the required column `iban` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `iban` VARCHAR(34) NOT NULL,
    ALTER COLUMN `address` DROP DEFAULT;
