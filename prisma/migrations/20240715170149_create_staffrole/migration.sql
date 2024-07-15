/*
  Warnings:

  - You are about to drop the column `roleId` on the `Staff` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Staff` DROP FOREIGN KEY `Staff_roleId_fkey`;

-- AlterTable
ALTER TABLE `Staff` DROP COLUMN `roleId`;

-- CreateTable
CREATE TABLE `StaffRole` (
    `staffId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`staffId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StaffRole` ADD CONSTRAINT `StaffRole_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffRole` ADD CONSTRAINT `StaffRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
