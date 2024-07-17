/*
  Warnings:

  - Added the required column `password` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `lastActivityAt` DATETIME(3) NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `lastActivityAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Subscription` ALTER COLUMN `startDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `SuperUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `lastActivityAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SuperUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `actionType` ENUM('CREATE', 'UPDATE', 'DELETE', 'VIEW') NOT NULL,
    `displayValue` VARCHAR(255) NOT NULL,
    `details` TEXT NULL,
    `ipAddress` VARCHAR(45) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `staffId` INTEGER NULL,
    `superUserId` INTEGER NULL,
    `clientId` INTEGER NULL,

    INDEX `ActivityLog_userId_idx`(`userId`),
    INDEX `ActivityLog_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_superUserId_fkey` FOREIGN KEY (`superUserId`) REFERENCES `SuperUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
