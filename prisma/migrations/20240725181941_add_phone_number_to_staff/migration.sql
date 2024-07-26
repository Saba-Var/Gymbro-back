/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `phoneNumber` VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Staff_phoneNumber_key` ON `Staff`(`phoneNumber`);
