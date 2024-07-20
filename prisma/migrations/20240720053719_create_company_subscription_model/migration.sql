/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_trainingPlanId_fkey`;

-- DropTable
DROP TABLE `Subscription`;

-- CreateTable
CREATE TABLE `StaffSubscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,
    `trainingPlanId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `originalPrice` DECIMAL(10, 2) NOT NULL,
    `discountAmount` DECIMAL(10, 2) NULL,
    `discountType` ENUM('FIXED', 'PERCENTAGE') NULL,
    `totalPrice` DECIMAL(10, 2) NOT NULL,
    `durationType` ENUM('MONTH', 'DAY') NOT NULL,
    `numberOfCycles` INTEGER NOT NULL,
    `pricePerCycle` DECIMAL(10, 2) NOT NULL,
    `commissionAmount` DECIMAL(10, 2) NULL,
    `commissionType` ENUM('PERCENTAGE', 'FIXED') NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanySubscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `totalPrice` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CompanySubscription_companyId_idx`(`companyId`),
    INDEX `CompanySubscription_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StaffSubscription` ADD CONSTRAINT `StaffSubscription_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffSubscription` ADD CONSTRAINT `StaffSubscription_trainingPlanId_fkey` FOREIGN KEY (`trainingPlanId`) REFERENCES `TrainingPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanySubscription` ADD CONSTRAINT `CompanySubscription_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
