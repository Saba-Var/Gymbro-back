/*
  Warnings:

  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - Added the required column `address` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` DROP COLUMN `name`,
    ADD COLUMN `address` VARCHAR(100) NOT NULL,
    ADD COLUMN `city` VARCHAR(50) NOT NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `logo` VARCHAR(100) NULL,
    ADD COLUMN `title` VARCHAR(100) NOT NULL,
    ADD COLUMN `websiteUrl` VARCHAR(100) NULL;
